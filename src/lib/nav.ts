import { services } from '../data/site';
import { url } from './paths';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Top navigation: one link per What I shoot row, then About. All are homepage sections: in-page links on the
 * homepage, links back to the homepage section elsewhere.
 */
export function getNavItems(isHome: boolean): NavItem[] {
  const section = (hash: string) => (isHome ? hash : url(hash));
  return [
    ...services.map((s) => ({ label: s.title, href: section(`#${s.gallery}`) })),
    { label: 'About', href: section('#about') },
  ];
}
