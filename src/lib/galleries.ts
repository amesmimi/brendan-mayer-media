import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

export interface Photo {
  file: string;
  image: ImageMetadata;
  title: string;
  alt: string;
  meta?: string;
  featured: boolean;
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

/** "placeholder-sports-03.jpg" -> "Placeholder sports 03" */
const titleFromFile = (file: string) => {
  const words = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

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

      type Entry = { file: string; title: string; alt?: string; meta?: string; featured: boolean };
      const entries: Entry[] = [
        ...listed,
        ...unlisted.map((file) => ({ file, title: titleFromFile(file), featured: false })),
      ];
      const photos: Photo[] = entries.map((p) => ({
        file: p.file,
        image: images.get(`${slug}/${p.file}`)!,
        title: p.title,
        alt: p.alt ?? `${p.title}. ${data.label} photo by Brendan Mayer.`,
        meta: p.meta,
        featured: p.featured,
        gallery: slug,
        galleryLabel: data.label,
      }));

      return { slug, label: data.label, blurb: data.blurb, order: data.order, photos };
    })
    .sort((a, b) => a.order - b.order);
}

/** Photos for the homepage slideshow: those marked `featured`, alternating between galleries. */
export async function getFeaturedPhotos(): Promise<Photo[]> {
  const galleries = await getGalleries();
  const queues = galleries.map((g) => {
    const featured = g.photos.filter((p) => p.featured);
    return featured.length ? featured : g.photos.slice(0, 1);
  });
  const result: Photo[] = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) {
    for (const q of queues) if (q[i]) result.push(q[i]);
  }
  return result;
}
