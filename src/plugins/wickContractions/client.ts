import type {ClientModule} from '@docusaurus/types';

const OPEN_SELECTOR = '.katex-html [data-wickopen]';
const CLOSE_SELECTOR = '.katex-html [data-wickclose]';
const POINT_PX = 96 / 72;
// A slightly tighter gap than simpler-wick's 3pt makes the vertical legs
// easier to read at browser-scale font sizes without touching the glyphs.
const ENDPOINT_CLEARANCE = 1.5 * POINT_PX;
const LEVEL_SEPARATION = 3 * POINT_PX;
const TIKZ_DEFAULT_LINE_WIDTH = 0.4 * POINT_PX;

let animationFrame: number | undefined;

function numericStyle(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function baselineFor(endpoint: HTMLElement, pairId: string): number {
  const probes = endpoint.querySelectorAll<HTMLElement>('[data-wickbaseline]');
  const probe = Array.from(probes).find(
    (element) => element.dataset.wickbaseline === pairId,
  );
  const rule = probe?.querySelector<HTMLElement>('.rule');
  return rule?.getBoundingClientRect().bottom ?? endpoint.getBoundingClientRect().bottom;
}

function contractionLevel(pairId: string): number {
  const match = /^l([1-9])-/.exec(pairId);
  return match ? Number(match[1]) : 1;
}

function renderContractions(root: HTMLElement): void {
  root.querySelector('[data-wick-overlay]')?.remove();
  root.classList.remove('wick-katex');

  const opens = Array.from(
    root.querySelectorAll<HTMLElement>(OPEN_SELECTOR),
  );
  if (opens.length === 0) return;

  const closes = new Map(
    Array.from(root.querySelectorAll<HTMLElement>(CLOSE_SELECTOR)).map(
      (element) => [element.dataset.wickclose, element],
    ),
  );

  root.classList.add('wick-katex');
  const rootRect = root.getBoundingClientRect();
  const em = numericStyle(getComputedStyle(root).fontSize);
  const paths: string[] = [];

  for (const open of opens) {
    const pairId = open.dataset.wickopen;
    const close = pairId ? closes.get(pairId) : undefined;
    if (!pairId || !close) continue;

    const openRect = open.getBoundingClientRect();
    const closeRect = close.getBoundingClientRect();
    const level = contractionLevel(pairId);
    const baseline = baselineFor(open, pairId);
    const top = baseline - em - level * LEVEL_SEPARATION - rootRect.top;
    const openX = openRect.left + openRect.width / 2 - rootRect.left;
    const closeX = closeRect.left + closeRect.width / 2 - rootRect.left;
    const openY = openRect.top - ENDPOINT_CLEARANCE - rootRect.top;
    const closeY = closeRect.top - ENDPOINT_CLEARANCE - rootRect.top;

    paths.push(
      `M ${openX} ${openY} V ${top} H ${closeX} V ${closeY}`,
    );
  }

  if (paths.length === 0) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.dataset.wickOverlay = '';
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('viewBox', `0 0 ${rootRect.width} ${rootRect.height}`);
  const physicalPixel = 1 / (window.devicePixelRatio || 1);
  const visibleLineWidth = Math.max(
    TIKZ_DEFAULT_LINE_WIDTH,
    physicalPixel,
  );
  svg.style.setProperty('--wick-line-width', `${visibleLineWidth}px`);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', paths.join(' '));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', String(TIKZ_DEFAULT_LINE_WIDTH));
  path.setAttribute('stroke-linecap', 'butt');
  path.setAttribute('stroke-linejoin', 'miter');
  path.setAttribute('vector-effect', 'non-scaling-stroke');

  svg.append(path);
  root.append(svg);
}

function renderAllContractions(): void {
  document
    .querySelectorAll<HTMLElement>('.katex')
    .forEach(renderContractions);
}

function scheduleRender(): void {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(() => {
    animationFrame = undefined;
    renderAllContractions();
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', scheduleRender);
  document.fonts?.ready.then(scheduleRender);
}

export const onRouteDidUpdate: ClientModule['onRouteDidUpdate'] = () => {
  scheduleRender();
};
