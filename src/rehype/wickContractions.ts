type HastNode = {
  type?: string;
  value?: string;
  properties?: {
    className?: unknown;
  };
  children?: HastNode[];
};

type Marker = {
  level: number;
  position: number;
};

type Endpoint = Marker & {
  end: number;
  attribute: 'wickopen' | 'wickclose';
  pairId: string;
};

function isEscaped(input: string, index: number): boolean {
  let backslashes = 0;
  for (let cursor = index - 1; cursor >= 0 && input[cursor] === '\\'; cursor -= 1) {
    backslashes += 1;
  }
  return backslashes % 2 === 1;
}

function findBalancedEnd(
  input: string,
  start: number,
  open: string,
  close: string,
): number {
  let depth = 0;

  for (let index = start; index < input.length; index += 1) {
    if (isEscaped(input, index)) continue;

    if (input[index] === open) depth += 1;
    if (input[index] === close) {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }

  throw new Error(`Unclosed ${open} in Wick contraction`);
}

function readAtomEnd(input: string, start: number): number {
  let index = start;
  while (/\s/.test(input[index] ?? '')) index += 1;

  if (index >= input.length) {
    throw new Error('Wick contraction marker is not followed by an atom');
  }

  if (input[index] === '\\') {
    index += 1;
    if (/[A-Za-z@]/.test(input[index] ?? '')) {
      while (/[A-Za-z@]/.test(input[index] ?? '')) index += 1;
    } else {
      index += 1;
    }
  } else if (input[index] === '{') {
    index = findBalancedEnd(input, index, '{', '}');
  } else {
    index += 1;
  }

  let scanning = true;
  while (scanning && index < input.length) {
    scanning = false;

    while (/\s/.test(input[index] ?? '')) index += 1;

    if (input[index] === '{') {
      index = findBalancedEnd(input, index, '{', '}');
      scanning = true;
    }

    if (input[index] === '(') {
      index = findBalancedEnd(input, index, '(', ')');
      scanning = true;
    }

    if (input[index] === '_' || input[index] === '^') {
      index += 1;
      while (/\s/.test(input[index] ?? '')) index += 1;
      if (input[index] === '{') {
        index = findBalancedEnd(input, index, '{', '}');
      } else if (input[index] === '\\') {
        index += 1;
        while (/[A-Za-z@]/.test(input[index] ?? '')) index += 1;
      } else {
        index += 1;
      }
      scanning = true;
    }
  }

  return index;
}

function parseMarkers(input: string): {clean: string; markers: Marker[]} {
  const markerPattern = /\\c(?:\{([1-9])\}|([1-9]))/g;
  const markers: Marker[] = [];
  let clean = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = markerPattern.exec(input)) !== null) {
    clean += input.slice(cursor, match.index);
    markers.push({
      level: Number(match[1] ?? match[2]),
      position: clean.length,
    });
    cursor = match.index + match[0].length;
  }

  clean += input.slice(cursor);
  return {clean, markers};
}

function createEndpoints(
  clean: string,
  markers: Marker[],
  wickIndex: number,
): Endpoint[] {
  const pending = new Map<number, {marker: Marker; pairId: string}>();
  const endpoints: Endpoint[] = [];
  let pairIndex = 0;

  for (const marker of markers) {
    const end = readAtomEnd(clean, marker.position);
    const open = pending.get(marker.level);

    if (!open) {
      const pairId = `l${marker.level}-w${wickIndex}-p${pairIndex}`;
      pairIndex += 1;
      pending.set(marker.level, {marker, pairId});
      endpoints.push({
        ...marker,
        end,
        attribute: 'wickopen',
        pairId,
      });
      continue;
    }

    endpoints.push({
      ...marker,
      end,
      attribute: 'wickclose',
      pairId: open.pairId,
    });
    pending.delete(marker.level);
  }

  if (pending.size > 0) {
    const levels = [...pending.keys()].join(', ');
    throw new Error(`Unpaired Wick contraction marker(s): ${levels}`);
  }

  return endpoints;
}

function renderWickBody(input: string, wickIndex: number): string {
  const {clean, markers} = parseMarkers(input);
  if (markers.length === 0) return clean;

  const endpoints = createEndpoints(clean, markers, wickIndex);
  const starts = new Map<number, Endpoint[]>();
  const ends = new Map<number, Endpoint[]>();

  for (const endpoint of endpoints) {
    const startingHere = starts.get(endpoint.position) ?? [];
    startingHere.push(endpoint);
    starts.set(endpoint.position, startingHere);
    const endingHere = ends.get(endpoint.end) ?? [];
    endingHere.push(endpoint);
    ends.set(endpoint.end, endingHere);
  }

  let output = '';
  for (let index = 0; index <= clean.length; index += 1) {
    output += '}'.repeat(ends.get(index)?.length ?? 0);

    for (const endpoint of starts.get(index) ?? []) {
      output +=
        `\\htmlData{${endpoint.attribute}=${endpoint.pairId}}{` +
        `\\htmlData{wickbaseline=${endpoint.pairId}}{` +
        '\\rule{0pt}{0.001em}}';
    }

    output += clean[index] ?? '';
  }

  // simpler-wick reserves offset + max(level) * sep above the baseline.
  const maxLevel = Math.max(...markers.map(({level}) => level));
  const reservedHeight = (1 + maxLevel * 0.3).toFixed(1);
  return `\\rule{0pt}{${reservedHeight}em}${output}`;
}

export function transformWickContractions(input: string): string {
  const command = '\\wick{';
  let output = input;
  let searchFrom = 0;
  let wickIndex = 0;

  while (true) {
    const start = output.indexOf(command, searchFrom);
    if (start === -1) break;

    const open = start + command.length - 1;
    const end = findBalancedEnd(output, open, '{', '}');
    const body = output.slice(open + 1, end - 1);
    const replacement = renderWickBody(body, wickIndex);

    output = output.slice(0, start) + replacement + output.slice(end);
    searchFrom = start + replacement.length;
    wickIndex += 1;
  }

  return output;
}

function hasMathClass(node: HastNode): boolean {
  const className = node.properties?.className;
  return (
    node.type === 'element' &&
    Array.isArray(className) &&
    className.some(
      (value) =>
        value === 'language-math' ||
        value === 'math-inline' ||
        value === 'math-display',
    )
  );
}

function transformTree(node: HastNode, insideMath = false): void {
  const isMath = insideMath || hasMathClass(node);

  if (isMath && node.type === 'text' && typeof node.value === 'string') {
    node.value = transformWickContractions(node.value);
  }

  node.children?.forEach((child) => transformTree(child, isMath));
}

export default function rehypeWickContractions() {
  return (tree: HastNode) => transformTree(tree);
}
