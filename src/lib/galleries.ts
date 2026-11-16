import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export interface Photo {
  file: string;
  image: ImageMetadata;
  /** Optional label (e.g. the artist); not shown on the site. */
  title?: string;
  alt: string;
  /** true = in the slideshow; a number pins it to that slide position (1 = first). */
  featured: boolean | number;
  focus?: 'top' | 'center' | 'bottom';
  gallery: string;
  galleryLabel: string;
}

export interface Gallery {
  slug: string;
  label: string;
  blurb: string;
  order: number;
  photos: Photo[];
}

// Every web-ready photo produced by `npm run photos`, keyed by "<gallery>/<file>".
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/galleries/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const images = new Map(
  Object.entries(imageModules).map(([p, mod]) => [p.replace('/src/assets/galleries/', ''), mod.default]),
);

let cache: Promise<Gallery[]> | undefined;

/** All galleries in display order, each with its photos (captioned ones first, in YAML order). */
export function getGalleries(): Promise<Gallery[]> {
  cache ??= load();
  return cache;
}

async function load(): Promise<Gallery[]> {
  const entries = await getCollection('galleries');
  return entries
    .map(({ id: slug, data }) => {
      const inFolder = [...images.keys()].filter((k) => k.startsWith(`${slug}/`)).map((k) => k.slice(slug.length + 1));
      const listed = data.photos.filter((p) => {
        if (inFolder.includes(p.file)) return true;
        console.warn(`[galleries] ${slug}.yaml lists "${p.file}" but src/assets/galleries/${slug}/ has no such photo.`);
        return false;
      });
      const listedFiles = new Set(listed.map((p) => p.file));
      const unlisted = inFolder.filter((f) => !listedFiles.has(f)).sort();

      type Entry = {
        file: string;
        title?: string;
        alt?: string;
        featured: boolean | number;
        focus?: 'top' | 'center' | 'bottom';
      };
      const entries: Entry[] = [...listed, ...unlisted.map((file) => ({ file, featured: false }))];
      const photos: Photo[] = entries.map((p) => ({
        file: p.file,
        image: images.get(`${slug}/${p.file}`)!,
        title: p.title,
        alt: p.alt ?? [p.title, `${data.label} photo by Brendan Mayer.`].filter(Boolean).join('. '),
        featured: p.featured,
        focus: p.focus,
        gallery: slug,
        galleryLabel: data.label,
      }));

      return { slug, label: data.label, blurb: data.blurb, order: data.order, photos };
    })
    .sort((a, b) => a.order - b.order);
}

/**
 * Photos for the homepage slideshow: those marked `featured`, alternating between galleries.
 * Photos featured with a number are pinned to that position (`featured: 1` is always the first slide).
 * If nothing is featured yet, it falls back to the first photo of each gallery.
 */
export async function getFeaturedPhotos(): Promise<Photo[]> {
  const galleries = await getGalleries();
  const all = galleries.flatMap((g) => g.photos);
  if (!all.some((p) => p.featured)) return galleries.flatMap((g) => g.photos.slice(0, 1));

  const pinned = all
    .filter((p): p is Photo & { featured: number } => typeof p.featured === 'number')
    .sort((a, b) => a.featured - b.featured);
  const queues = galleries.map((g) => g.photos.filter((p) => p.featured === true));
  const result: Photo[] = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) {
    for (const q of queues) if (q[i]) result.push(q[i]);
  }
  for (const p of pinned) result.splice(Math.min(p.featured - 1, result.length), 0, p);
  return result;
}

/** The photo shown in link previews for the homepage and gallery page (`shareImage` in site.ts). */
export async function getSharePhoto(): Promise<Photo | undefined> {
  const { gallery, file } = site.shareImage;
  const photo = (await getGalleries()).find((g) => g.slug === gallery)?.photos.find((p) => p.file === file);
  return photo ?? (await getFeaturedPhotos())[0];
}
