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
          title: z.string(),
          alt: z.string().optional(),
          meta: z.string().optional(),
          // true = in the homepage slideshow; a number (1, 2, ...) also pins it to that slide position.
          featured: z.union([z.boolean(), z.number().int().positive()]).default(false),
          // Where to anchor the photo when it's cropped (homepage slideshow, gallery grid). Default: centre.
          focus: z.enum(['top', 'center', 'bottom']).optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { galleries };
