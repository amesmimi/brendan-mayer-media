import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Encoding quality for every photo the site generates. High, so stage light, haze and hair keep their detail. */
export const PHOTO_QUALITY = 88;

/** Responsive widths to generate, never larger than the source photo. */
export function widthsFor(image: ImageMetadata, widths: number[]): number[] {
  const fitting = widths.filter((w) => w < image.width);
  return [...fitting, Math.min(image.width, Math.max(...widths))];
}

/**
 * Size hints for a photo cropped to fill its box (object-fit: cover). A photo wider than its box is drawn wider than
 * the box, by the ratio of the two shapes, so the hints are scaled up by that much; otherwise the browser picks a
 * file sized to the box and stretches it. `boxAspect` is the box's width divided by its height (1 for a square).
 */
export function coverSizes(image: ImageMetadata, boxAspect: number, sizes: string): string {
  const factor = Math.max(1, image.width / image.height / boxAspect);
  return sizes
    .split(',')
    .map((part) =>
      part.replace(
        /(\d+(?:\.\d+)?)(px|vw)\s*$/,
        (_, n: string, unit: string) => `${Math.round(Number(n) * factor)}${unit}`,
      ),
    )
    .join(',');
}

/** The large version opened in the full-screen photo viewer. */
export async function viewerImage(image: ImageMetadata) {
  const width = Math.min(image.width, 3200);
  const result = await getImage({ src: image, width, format: 'webp', quality: PHOTO_QUALITY });
  return {
    src: result.src,
    width,
    height: Math.round((image.height / image.width) * width),
  };
}
