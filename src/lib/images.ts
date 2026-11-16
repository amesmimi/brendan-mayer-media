import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Responsive widths to generate, never larger than the source photo. */
export function widthsFor(image: ImageMetadata, widths: number[]): number[] {
  const fitting = widths.filter((w) => w < image.width);
  return [...fitting, Math.min(image.width, Math.max(...widths))];
}

/** The large version opened in the full-screen photo viewer. */
export async function viewerImage(image: ImageMetadata) {
  const width = Math.min(image.width, 2400);
  const result = await getImage({ src: image, width, format: 'webp', quality: 82 });
  return {
    src: result.src,
    width,
    height: Math.round((image.height / image.width) * width),
  };
}
