import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'diagrams', 'qft');
const outputDirectory = path.join(root, 'static', 'img', 'qft', 'feynman');
const checkOnly = process.argv.includes('--check');
const force = process.argv.includes('--force');
const hashPattern = /<!-- source-sha256:([a-f0-9]{64}) -->/;

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    shell: false,
  });

  if (result.error || result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
    throw new Error(
      `Failed to run ${command} ${args.join(' ')}\n${output}`,
      {cause: result.error},
    );
  }
}

async function sourceHash(sourcePath) {
  const generator = await readFile(fileURLToPath(import.meta.url));
  const source = await readFile(sourcePath);
  return createHash('sha256')
    .update(generator)
    .update('\0')
    .update(source)
    .digest('hex');
}

async function recordedHash(outputPath) {
  try {
    const output = await readFile(outputPath, 'utf8');
    return hashPattern.exec(output)?.[1];
  } catch (error) {
    if (error?.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function render(sourcePath, outputPath, hash) {
  const workDirectory = await mkdtemp(path.join(tmpdir(), 'qft-diagram-'));
  const basename = path.basename(sourcePath, '.tex');
  const pdfPath = path.join(workDirectory, `${basename}.pdf`);
  const svgPath = path.join(workDirectory, `${basename}.svg`);

  try {
    run(
      process.env.LUALATEX || 'lualatex',
      [
        '--interaction=nonstopmode',
        '--halt-on-error',
        '--file-line-error',
        `--output-directory=${workDirectory}`,
        sourcePath,
      ],
      sourceDirectory,
    );

    run(
      process.env.DVISVGM || 'dvisvgm',
      [
        '--pdf',
        '--bbox=min',
        '--no-fonts',
        '--optimize=all',
        `--output=${svgPath}`,
        pdfPath,
      ],
      workDirectory,
    );

    const svg = await readFile(svgPath, 'utf8');
    const metadata = `<!-- source-sha256:${hash} -->`;
    const stamped = svg.startsWith('<?xml')
      ? svg.replace(/\?>/, `?>\n${metadata}`)
      : `${metadata}\n${svg}`;

    await mkdir(path.dirname(outputPath), {recursive: true});
    await writeFile(outputPath, stamped, 'utf8');
  } finally {
    await rm(workDirectory, {recursive: true, force: true});
  }
}

const sourceFiles = (await readdir(sourceDirectory))
  .filter((filename) => filename.endsWith('.tex'))
  .sort();

const stale = [];
for (const filename of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, filename);
  const outputPath = path.join(
    outputDirectory,
    filename.replace(/\.tex$/, '.svg'),
  );
  const hash = await sourceHash(sourcePath);
  const current = await recordedHash(outputPath);

  if (current === hash && !force) {
    console.log(`up to date: ${path.relative(root, outputPath)}`);
    continue;
  }

  if (checkOnly) {
    stale.push(path.relative(root, outputPath));
    continue;
  }

  await render(sourcePath, outputPath, hash);
  console.log(`generated: ${path.relative(root, outputPath)}`);
}

if (stale.length > 0) {
  console.error('Generated Feynman diagrams are missing or stale:');
  stale.forEach((filename) => console.error(`  - ${filename}`));
  console.error('Run `npm run diagrams` and commit the generated SVG files.');
  process.exitCode = 1;
}
