import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * Search engines are welcome; known AI training crawlers are asked to stay out.
 * Well-behaved bots honour this; it's a request, not a lock.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'cohere-ai',
  'Diffbot',
  'ImagesiftBot',
  'Omgilibot',
  'Timpibot',
];

export const GET: APIRoute = ({ site: siteUrl }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, siteUrl);
  const body = [
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Disallow: /', '']),
    // Search engines may still crawl during preview, so they can see each page's noindex tag.
    'User-agent: *',
    'Allow: /',
    '',
    ...(site.preview ? [] : [`Sitemap: ${sitemap.href}`, '']),
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
