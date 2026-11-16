#!/usr/bin/env node
/**
 * Prepares photos for the website.
 *
 *   npm run photos            process new or changed photos
 *   npm run photos -- --force reprocess everything
 *
 * Reads full-resolution originals from incoming/<folder>/ (never committed) and writes
 * web-ready copies into src/assets/:
 *
 *   incoming/about/      -> src/assets/about/
 *   incoming/site/       -> src/assets/site/          (backgrounds etc.)
 *   incoming/<category>/ -> src/assets/galleries/<category>/
 *
 * Subfolders such as incoming/about/not-used/ are skipped, so photos can be parked there.
 *
 * Each copy is resized so its long edge is at most MAX_EDGE px, converted to sRGB JPEG,
 * stripped of all original metadata (GPS location, camera serial numbers, etc.) and
 * stamped with Brendan's copyright in the EXIF Artist/Copyright fields.
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const AUTHOR = 'Brendan Mayer';
// 3200px keeps photos crisp on high-resolution screens while staying well short of print quality.
const MAX_EDGE = 3200;
const QUALITY = 90;
const NON_GALLERY_FOLDERS = new Set(['about', 'site']);
const INPUT_TYPES = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp']);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const incomingDir = path.join(root, 'incoming');
const force = process.argv.includes('--force');

/** "IMG 0042 (Final).JPG" -> "img-0042-final" */
const slugify = (name) =>
  name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');

const outputDirFor = (folder) =>
  NON_GALLERY_FOLDERS.has(folder)
    ? path.join(root, 'src/assets', folder)
    : path.join(root, 'src/assets/galleries', folder);

async function isUpToDate(input, output) {
  if (force || !existsSync(output)) return false;
  const [src, out] = await Promise.all([stat(input), stat(output)]);
  return out.mtimeMs >= src.mtimeMs;
}

async function processPhoto(input, output) {
  const year = new Date().getFullYear();
  await sharp(input)
    .rotate() // apply the camera's orientation flag before metadata is stripped
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .toColourspace('srgb')
    .withExif({
      IFD0: {
        Artist: AUTHOR,
        Copyright: `© ${year} ${AUTHOR}. All rights reserved.`,
      },
    })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(output);
  return sharp(output).metadata();
}

async function main() {
  if (!existsSync(incomingDir)) {
    console.error('No incoming/ folder found. Create incoming/<category>/ and add photos to it.');
    process.exit(1);
  }

  const folders = (await readdir(incomingDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let made = 0;
  let skipped = 0;
  const problems = [];

  for (const folder of folders) {
    const inDir = path.join(incomingDir, folder);
    const outDir = outputDirFor(folder);
    // Only files directly inside the folder are published; subfolders (e.g. not-used/) are ignored.
    const files = (await readdir(inDir, { withFileTypes: true }))
      .filter((d) => d.isFile() && !d.name.startsWith('.'))
      .map((d) => d.name)
      .sort();
    if (files.length === 0) continue;
    await mkdir(outDir, { recursive: true });
    console.log(`\n${folder}/`);

    const seen = new Map();
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!INPUT_TYPES.has(ext)) {
        problems.push(`${folder}/${file}: unsupported file type (export it as a JPEG first)`);
        continue;
      }
      const outName = `${slugify(path.basename(file, path.extname(file)))}.jpg`;
      if (seen.has(outName)) {
        problems.push(`${folder}/${file}: same web name as ${seen.get(outName)}, rename one of them`);
        continue;
      }
      seen.set(outName, file);

      const input = path.join(inDir, file);
      const output = path.join(outDir, outName);
      if (await isUpToDate(input, output)) {
        skipped++;
        continue;
      }
      try {
        const meta = await processPhoto(input, output);
        made++;
        console.log(`  ✓ ${outName}  ${meta.width}×${meta.height}`);
      } catch (err) {
        problems.push(`${folder}/${file}: ${err.message}`);
      }
    }
  }

  console.log(`\nDone: ${made} prepared, ${skipped} already up to date.`);
  if (problems.length) {
    console.log('\nNeeds attention:');
    for (const p of problems) console.log(`  ! ${p}`);
    process.exitCode = 1;
  }
}

main();
