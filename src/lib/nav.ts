import { url } from './paths';

export interface NavItem {
  label: string;
  href: string;
  /** Marks the link for the page being viewed. */
  current?: boolean;
}

/**
 * Top navigation. Gallery opens the first gallery page (its chips switch between the others). Services and About
 * are homepage sections: in-page links on the homepage, links back to the homepage section elsewhere.
 */
export function getNavItems(isHome: boolean, galleryHref: string, onGalleryPage: boolean): NavItem[] {
  const section = (hash: string) => (isHome ? hash : url(hash));
  return [
    { label: 'Gallery', href: galleryHref, current: onGalleryPage },
    { label: 'Services', href: section('#services') },
    { label: 'About', href: section('#about') },
  ];
}
