import type { APIRoute } from 'astro';

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

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site);
  const body = [
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Disallow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap.href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
