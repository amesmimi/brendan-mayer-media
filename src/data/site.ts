/**
 * Site-wide settings and copy. Most text edits that aren't photo captions happen here.
 */

export const site = {
  name: 'Brendan Mayer Media',
  photographer: 'Brendan Mayer',
  tagline: 'Concert, festival, event and sports photography from Victoria, BC.',
  description:
    'Brendan Mayer is a concert, festival, event and sports photographer based in Victoria, BC, working with artists, promoters, venues and teams.',
  location: 'Victoria, BC',
  serviceArea: 'Based in Victoria, BC. Travels across Vancouver Island and the Lower Mainland.',
  instagram: { handle: '@brendanmayer', url: 'https://www.instagram.com/brendanmayer/' },
  /**
   * Placeholder until launch. Brendan's real address replaces this just before go-live,
   * so it never sits in the public repo during development.
   * Stored in two parts and assembled in the browser so simple scrapers can't harvest it.
   */
  email: { user: 'hello', domain: 'example.com' },
  copyrightYear: 2026,
  /**
   * Unlisted preview mode for review before launch: pages ask search engines not to index them
   * and the sitemap isn't advertised. Set to false at launch.
   */
  preview: true,
} as const;

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
] as const;

export const about = {
  heading: "Hi, I'm Brendan",
  paragraphs: [
    "I'm a photographer based in Victoria, BC. I spend most nights in photo pits and on sidelines, chasing the second when the lights hit, the crowd lifts or the puck crosses the line.",
    'I work with artists, promoters, venues and teams who want photos that feel the way the night felt. Fast turnaround, edited with care, delivered ready for press and socials.',
  ],
  artists: [
    'Jason Isbell',
    'July Talk',
    'Portugal. The Man',
    'Third Eye Blind',
    'Frazey Ford',
    'Allan Rayman',
    'Billie Marten',
    'Reignwolf',
    'Yonaka',
    'Aqua',
  ],
  /** Set to a file in public/ (e.g. 'brendan-mayer-cv.pdf') once Brendan has a CV to share. */
  cvFile: null as string | null,
};

/** Service cards. `gallery` links to the matching gallery page and must match a gallery file name. */
export const services = [
  {
    gallery: 'concerts',
    title: 'Concerts and tours',
    text: 'Live coverage for artists, management, venues and promoters.',
    items: ['First three songs or the full set', 'Edited gallery within 48 hours', 'Press and social-ready crops'],
  },
  {
    gallery: 'festivals',
    title: 'Festivals',
    text: 'Full-day or multi-day coverage of stages, crowds and atmosphere.',
    items: ['Artist sets and crowd moments', 'Same-night selects for socials', 'Sponsor and site photography'],
  },
  {
    gallery: 'events',
    title: 'Events',
    text: 'Launches, galas, conferences and private celebrations.',
    items: ['Speakers, panels and award moments', 'Candid guests and atmosphere', 'Fast selects for press and socials'],
  },
  {
    gallery: 'sports',
    title: 'Sports',
    text: 'Game-day action for teams, leagues, athletes and media.',
    items: [
      'Hockey, soccer, basketball, track and more',
      'Fast-glass low-light coverage',
      'Team, roster and promo shots',
    ],
  },
] as const;

/** Questions pre-filled into booking emails. */
export const bookingChecklist = ['Date', 'Venue / location', 'Type of event', 'What the photos are for', 'Budget'];
