import { url } from './paths';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Top navigation: links to homepage sections. On the homepage they stay in-page; elsewhere they lead back
 * to the homepage section. Gallery pages are reached from the Work section ("View all" / "See all").
 */
export function getNavItems(isHome: boolean): NavItem[] {
  const section = (hash: string) => (isHome ? hash : url(hash));
  return [
    { label: 'Work', href: section('#work') },
    { label: 'About', href: section('#about') },
    { label: 'Services', href: section('#services') },
  ];
}
