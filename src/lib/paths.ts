/** Prefixes a site path with the configured base, e.g. url('galleries/sports/') -> '/brendan-mayer-media/galleries/sports/'. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
