// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Where the site is served from.
 * Until brendanmayermedia.ca is bought it lives at https://amesmimi.github.io/brendan-mayer-media/.
 * Once the domain is pointed at GitHub Pages:
 *   1. set SITE to 'https://brendanmayermedia.ca' and BASE to '/'
 *   2. add public/CNAME containing: brendanmayermedia.ca
 */
const SITE = 'https://amesmimi.github.io';
const BASE = '/brendan-mayer-media';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  // No Markdown code blocks on this site; turning highlighting off avoids Shiki's inline styles under the CSP.
  markdown: { syntaxHighlight: false },
  build: {
    // Keep CSS in files rather than inline <style> blocks.
    inlineStylesheets: 'never',
  },
  security: {
    // GitHub Pages can't send HTTP security headers, so Astro writes the policy into a <meta> tag
    // and adds hashes for every script and style it outputs.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "frame-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
        'upgrade-insecure-requests',
      ],
    },
  },
});
