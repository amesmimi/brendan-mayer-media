import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One YAML file per photo category in src/content/galleries/.
 * The file name (e.g. sports.yaml) must match the photo folder name (src/assets/galleries/sports/).
 * Listing photos is optional: any photo in the folder that isn't listed still appears, after the listed ones.
 */
const galleries = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/galleries' }),
  schema: z.object({
    label: z.string(),
    order: z.number(),
    blurb: z.string(),
    photos: z
      .array(
        z.object({
          file: z.string(),
          // Not shown on the site: a label for us (e.g. the artist), also used in the screen-reader text.
          title: z.string().optional(),
          // Shown over the photo on hover (gallery and homepage). Leave it out where we don't know the name.
          caption: z.string().optional(),
          alt: z.string().optional(),
          // true = in the homepage slideshow; a number (1, 2, ...) also pins it to that slide position.
          featured: z.union([z.boolean(), z.number().int().positive()]).default(false),
          // Where to anchor the photo when it's cropped (homepage slideshow, gallery grid). Default: centre.
          focus: z.enum(['top', 'center', 'bottom']).optional(),
          // Gallery tiles are square: where to crop a wide photo, from 0 (keep the left edge) to 100 (keep the right edge),
          // in steps of 5, so the subject sits in the middle of its square. Default: centre.
          x: z.number().int().min(0).max(100).multipleOf(5).optional(),
          // Homepage slideshow only, finer than focus: how far down the photo to frame it, from 0 (keep the top) to
          // 100 (keep the bottom), in steps of 5. Overrides focus there.
          heroY: z.number().int().min(0).max(100).multipleOf(5).optional(),
          // Homepage slideshow on phones only, where the sides are cropped off: how far across the photo to frame it,
          // from 0 (keep the left edge) to 100 (keep the right edge), in steps of 5. Default: centre.
          heroX: z.number().int().min(0).max(100).multipleOf(5).optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { galleries };
