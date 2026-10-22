#!/usr/bin/env python3
"""Generate diagrams/bundles/mobius-bundle.tex.

The Möbius band is projected orthographically, split into small patches,
matte-shaded, and emitted as plain TikZ.  Lines are classified as visible or
hidden against the triangulated surface, so the TikZ file needs no 3D engine
and compiles with the repository's lualatex -> dvisvgm pipeline.

Run from the repository root:
    python3 scripts/generate-mobius-tikz.py
"""

from __future__ import annotations

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "diagrams" / "bundles" / "mobius-bundle.tex"

# The SVG-style coordinate system used below has y pointing down.  TikZ has y
# pointing up, so every emitted point is converted with this height.
CANVAS_HEIGHT = 620.0

SURFACE_CENTER = (270.0, 310.0)
BASE_CENTER = (655.0, 175.0)  # already in TikZ (y-up) coordinates
BASE_RX, BASE_RY = 92.0, 26.0


# ---------------------------------------------------------------------------
# Vector helpers
# ---------------------------------------------------------------------------


def add(a, b):
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def sub(a, b):
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def mul(a, s):
    return (a[0] * s, a[1] * s, a[2] * s)


def dot(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def cross(a, b):
    return (
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    )


def normalize(a):
    return mul(a, 1.0 / math.sqrt(dot(a, a)))


def fmt(value):
    text = f"{value:.2f}".rstrip("0").rstrip(".")
    return "0" if text in ("-0", "") else text


# ---------------------------------------------------------------------------
# Camera and surface
# ---------------------------------------------------------------------------


class Camera:
    def __init__(self, azimuth_deg, elevation_deg, scale, center):
        az = math.radians(azimuth_deg)
        el = math.radians(elevation_deg)
        self.az = az
        self.d = (
            math.cos(el) * math.cos(az),
            math.cos(el) * math.sin(az),
            math.sin(el),
        )
        self.right = (-math.sin(az), math.cos(az), 0.0)
        self.up = (
            -math.sin(el) * math.cos(az),
            -math.sin(el) * math.sin(az),
            math.cos(el),
        )
        self.scale = scale
        self.center = center
        self.light = normalize(
            add(
                add(mul(self.up, 0.58), mul(self.right, -0.44)),
                mul(self.d, 0.68),
            )
        )

    def project(self, point):
        return (
            self.center[0] + self.scale * dot(point, self.right),
            self.center[1] - self.scale * dot(point, self.up),
            dot(point, self.d),
        )

    def towards_viewer(self, point, amount):
        return add(point, mul(self.d, amount))


def mobius_point(u, v, radius=1.0):
    r = radius + v * math.cos(u / 2.0)
    return (r * math.cos(u), r * math.sin(u), v * math.sin(u / 2.0))


def circle_points(radius, v, count):
    return [
        mobius_point(2.0 * math.pi * i / count, v, radius)
        for i in range(count + 1)
    ]


def fiber_points(u, radius, half_width, count):
    return [
        mobius_point(u, -half_width + 2.0 * half_width * i / count, radius)
        for i in range(count + 1)
    ]


class Visibility:
    """Approximate hidden-surface test against the triangulated band."""

    def __init__(self, camera):
        self.camera = camera
        self.triangles = []

    def add_quad(self, p00, p10, p11, p01):
        for tri in ((p00, p10, p11), (p00, p11, p01)):
            (x0, y0, d0), (x1, y1, d1), (x2, y2, d2) = (
                self.camera.project(p) for p in tri
            )
            self.triangles.append(
                (
                    min(x0, x1, x2),
                    max(x0, x1, x2),
                    min(y0, y1, y2),
                    max(y0, y1, y2),
                    x0,
                    y0,
                    d0,
                    x1,
                    y1,
                    d1,
                    x2,
                    y2,
                    d2,
                )
            )

    def visible(self, point):
        x, y, depth = self.camera.project(
            self.camera.towards_viewer(point, 0.018)
        )
        for tri in self.triangles:
            xmin, xmax, ymin, ymax = tri[:4]
            if x < xmin or x > xmax or y < ymin or y > ymax:
                continue
            x0, y0, d0, x1, y1, d1, x2, y2, d2 = tri[4:]
            den = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2)
            if abs(den) < 1e-12:
                continue
            a = ((y1 - y2) * (x - x2) + (x2 - x1) * (y - y2)) / den
            b = ((y2 - y0) * (x - x2) + (x0 - x2) * (y - y2)) / den
            c = 1.0 - a - b
            if a < -1e-7 or b < -1e-7 or c < -1e-7:
                continue
            if a * d0 + b * d1 + c * d2 > depth + 0.004:
                return False
        return True


# ---------------------------------------------------------------------------
# TikZ emission
# ---------------------------------------------------------------------------


def tikz_point(screen):
    x, y = screen[:2]
    return f"({fmt(x)},{fmt(CANVAS_HEIGHT - y)})"


def tikz_path(screen_points):
    return " -- ".join(tikz_point(p) for p in screen_points)


def split_runs(points, is_visible):
    runs = []
    start = 0
    current = is_visible(points[0])
    for i in range(1, len(points)):
        visible = is_visible(points[i])
        if visible != current:
            runs.append((current, points[start : i + 1]))
            start = i
            current = visible
    runs.append((current, points[start:]))
    return runs


class Builder:
    def __init__(self):
        self.patches = []
        self.hidden = []
        self.visible = []

    def patch(self, depth, screen_points, shade):
        percent = max(0, min(100, round(32 + 68 * shade)))
        path = tikz_path(screen_points)
        self.patches.append(
            (
                depth,
                f"  \\filldraw[fill=paper!{percent}!shadow,"
                f"draw=paper!{percent}!shadow,line width=0.2pt] "
                f"{path} -- cycle;",
            )
        )

    def curve(
        self,
        camera,
        points,
        visible_style,
        hidden_style,
        visibility=None,
        is_visible=None,
        include_hidden=True,
    ):
        predicate = is_visible if is_visible is not None else visibility.visible
        runs = split_runs(points, predicate)
        for visible, run in runs:
            if len(run) < 2:
                continue
            if not visible and not include_hidden:
                continue
            style = visible_style if visible else hidden_style
            target = self.visible if visible else self.hidden
            target.append(
                f"  \\draw[{style}] {tikz_path([camera.project(p) for p in run])};"
            )

    def body(self):
        patches = "\n".join(
            command for _, command in sorted(self.patches, key=lambda x: x[0])
        )
        hidden = "\n".join(self.hidden)
        visible = "\n".join(self.visible)
        return patches, hidden, visible


def build_surface():
    camera = Camera(-65.0, 19.0, 150.0, SURFACE_CENTER)
    radius = 1.0
    half_width = 0.33
    nu, nv = 160, 8

    visibility = Visibility(camera)
    builder = Builder()
    quads = []
    for i in range(nu):
        u0 = 2.0 * math.pi * i / nu
        u1 = 2.0 * math.pi * (i + 1) / nu
        for j in range(nv):
            v0 = -half_width + 2.0 * half_width * j / nv
            v1 = -half_width + 2.0 * half_width * (j + 1) / nv
            quad = (
                mobius_point(u0, v0, radius),
                mobius_point(u1, v0, radius),
                mobius_point(u1, v1, radius),
                mobius_point(u0, v1, radius),
            )
            quads.append(quad)
            visibility.add_quad(*quad)

    for quad in quads:
        p00, p10, p11, p01 = quad
        normal = normalize(cross(sub(p10, p00), sub(p01, p00)))
        shade = abs(dot(normal, camera.light))
        screen = [camera.project(p) for p in quad]
        depth = sum(p[2] for p in screen) / 4.0
        builder.patch(depth, screen, shade)

    # Fibres: one highlighted on the near-right side, the rest as a sparse
    # family.  Hidden parts of the ordinary fibres are omitted to keep the
    # drawing quiet; the boundary and zero section keep their hidden parts.
    highlight_u = math.radians(40.0)
    for k in range(10):
        u = 2.0 * math.pi * k / 10.0
        if abs(math.sin((u - highlight_u) / 2.0)) < 0.18:
            continue
        builder.curve(
            camera,
            fiber_points(u, radius, half_width, 9),
            "ink!72,line width=0.7pt",
            "muted!60,dashed,line width=0.6pt",
            visibility=visibility,
            include_hidden=False,
        )

    for edge in (half_width, -half_width):
        builder.curve(
            camera,
            circle_points(radius, edge, 240),
            "ink,line width=1.4pt",
            "muted!60,dashed,line width=0.8pt",
            visibility=visibility,
        )

    builder.curve(
        camera,
        circle_points(radius, 0.0, 240),
        "teal,line width=1.5pt",
        "teal!55,dashed,line width=0.8pt",
        visibility=visibility,
    )

    highlight = fiber_points(highlight_u, radius, half_width, 28)
    builder.curve(
        camera,
        highlight,
        "accent,line width=2.1pt",
        "accent!55,dashed,line width=0.8pt",
        visibility=visibility,
    )

    highlight_screen = [camera.project(p) for p in highlight]
    return builder, highlight_screen


def base_and_labels(highlight_screen):
    """Return TikZ for the base circle, projection fan, and labels."""

    points = [tikz_point(p) for p in highlight_screen]
    # Three representative points on the highlighted fibre.
    chosen = [points[0], points[len(points) // 2], points[-1]]

    angle = math.radians(170.0)
    bx = BASE_CENTER[0] + BASE_RX * math.cos(angle)
    by = BASE_CENTER[1] + BASE_RY * math.sin(angle)

    lines = []
    for point in chosen:
        lines.append(
            f"  \\draw[muted!85,dashed,line width=0.8pt] {point} -- "
            f"({fmt(bx)},{fmt(by)});"
        )
    lines.append(f"  \\fill[ink] ({fmt(bx)},{fmt(by)}) circle[radius=2.2pt];")
    lines.append(
        "  \\draw[ink,line width=1.4pt,-{Stealth}] "
        f"({{{fmt(BASE_CENTER[0])}+{fmt(BASE_RX)}*cos(12)}},"
        f"{{{fmt(BASE_CENTER[1])}+{fmt(BASE_RY)}*sin(12)}}) "
        f"arc[start angle=12,end angle=350,x radius={fmt(BASE_RX)},"
        f"y radius={fmt(BASE_RY)}];"
    )
    lines.append(
        "  \\node[ink,font=\\fontsize{26}{30}\\selectfont] at "
        f"({fmt(BASE_CENTER[0])},{fmt(BASE_CENTER[1] - 60)}) {{$S^1$}};"
    )
    # Place pi in the open area above the middle ray.
    lines.append(
        "  \\node[muted,font=\\fontsize{22}{26}\\selectfont] at "
        f"({fmt(bx - 59)},{fmt(by + 150)}) {{$\\pi$}};"
    )
    return "\n".join(lines)


def main():
    builder, highlight_screen = build_surface()
    patches, hidden, visible = builder.body()
    labels = base_and_labels(highlight_screen)

    document = f"""% Möbius bundle over S^1, drawn as a shaded band.
% Generated by scripts/generate-mobius-tikz.py; regenerate instead of editing.
% Compile with: lualatex -> dvisvgm --pdf.
\\documentclass[tikz,border=10pt]{{standalone}}
\\usepackage{{amsmath,amssymb}}
\\usetikzlibrary{{arrows.meta}}

\\definecolor{{ink}}{{HTML}}{{22303A}}
\\definecolor{{muted}}{{HTML}}{{7C8792}}
\\definecolor{{accent}}{{HTML}}{{C2410C}}
\\definecolor{{teal}}{{HTML}}{{0F766E}}
\\definecolor{{paper}}{{HTML}}{{F5ECDD}}
\\definecolor{{shadow}}{{HTML}}{{E2D3BE}}

\\begin{{document}}
\\begin{{tikzpicture}}[x=1pt,y=1pt,line cap=round,line join=round,>=Stealth]
  % Matte-shaded patches, far to near.
{patches}

  % Hidden edges and zero section.
{hidden}

  % Visible fibres, edges, and zero section.
{visible}

{labels}
\\end{{tikzpicture}}
\\end{{document}}
"""
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(document, encoding="utf-8")
    print(f"wrote {TARGET.relative_to(ROOT)} ({len(document) / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()
