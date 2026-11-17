/**
 * Site-wide settings and copy. Most text edits happen here; photo descriptions live in the gallery files.
 */

export const site = {
  name: 'Brendan Mayer Media',
  photographer: 'Brendan Mayer',
  /** The big statement under the header slideshow; the homepage's main heading. */
  intro: 'I photograph live music, sports, and events on Vancouver Island.',
  /** The line under the Gallery heading. */
  galleryIntro: 'Live music, sports and events from Vancouver Island and beyond.',
  description:
    'Brendan Mayer is a live music, sports and event photographer based in Victoria, B.C., working with artists, promoters, venues, sports leagues and teams.',
  location: 'Victoria, B.C.',
  serviceArea: 'Based in Victoria, B.C.',
  instagram: { handle: '@brendanmayer', url: 'https://www.instagram.com/brendanmayer/' },
  /**
   * Brendan's Gmail, approved by him for the site. Switching to a work address later (e.g. hello@brendanmayermedia.ca)
   * is a change here only. Stored in two parts and assembled in the browser so simple scrapers can't harvest it.
   */
  email: { user: 'brendanjmayer', domain: 'gmail.com' },
  copyrightYear: 2026,
  /**
   * The photo shown when someone shares a link to the homepage (iMessage, Slack, social posts), cropped to 1200×630.
   * Separate from the header slideshow, so slide 1 can be something else. The gallery page uses it too.
   */
  shareImage: { gallery: 'sports', file: 'brendan-whitecaps-winger.jpg' },
  /**
   * Unlisted preview mode for review before launch: pages ask search engines not to index them
   * and the sitemap isn't advertised. Set to false at launch.
   */
  preview: true,
} as const;

export const about = {
  heading: 'About',
  paragraphs: [
    "I'm a photographer in Victoria, B.C. Most of my work is live music, sports and community events.",
    'I like the in-between moments as much as the big ones. I shoot for artists, venues, leagues and teams, and I deliver edited galleries fast, ready for press and social media.',
  ],
  /** Names with photos on the site ("I've photographed …" in About): sports and Cirque first, then the musicians together. */
  artists: [
    'Vancouver Whitecaps FC',
    'Cirque du Soleil',
    'Portugal. The Man',
    'July Talk',
    'Allan Rayman',
    'Yonaka',
    'Billie Marten',
  ],
  /** Set to a file in public/ (e.g. 'brendan-mayer-cv.pdf') once Brendan has a CV to share. */
  cvFile: null as string | null,
};

export interface ServicePhoto {
  /** File name in the service's gallery folder. */
  file: string;
  /**
   * Where to crop the photo when it's cut to a square, from 0 (keep the left edge) to 100 (keep the right edge),
   * in steps of 5. Leave it out to keep the centre.
   */
  x?: number;
}

export interface Service {
  /** Must match a gallery file name; the "View gallery" button opens that gallery. */
  gallery: string;
  title: string;
  /** One or two sentences: who it's for and what they get. */
  text: string;
  /** Three photos from the gallery: the big square first, then the two small ones stacked beside it. */
  photos: ServicePhoto[];
}

/** The "What I shoot" section, one row per service. */
export const services: Service[] = [
  {
    gallery: 'sports',
    title: 'Sports',
    text: 'Game-day action and the athletes behind it, for leagues, teams and media.',
    photos: [
      { file: 'brendan-whitecaps-huddle.jpg', x: 45 },
      { file: 'brendan-swimmer.jpg' },
      { file: 'brendan-speed-climber.jpg', x: 25 },
    ],
  },
  {
    gallery: 'live-music',
    title: 'Live Music',
    text: 'Concert and festival coverage for artists, management, venues and promoters. First three songs or the full set, edited within 48 hours.',
    photos: [
      { file: 'brendan-sepia-guitar.jpg', x: 30 },
      { file: 'brendan-pedal-steel.jpg' },
      { file: 'brendan-billie-marten.jpg', x: 25 },
    ],
  },
  {
    gallery: 'events',
    title: 'Events',
    text: 'Community gatherings, cultural celebrations and the stories behind them.',
    photos: [
      { file: 'brendan-ceremonial-dance.jpg', x: 100 },
      { file: 'brendan-greek-fest.jpg' },
      { file: 'brendan-bar-portrait.jpg', x: 60 },
    ],
  },
];

/** Questions pre-filled into booking emails. */
export const bookingChecklist = ['Date', 'Venue / location', 'Type of event', 'What the photos are for', 'Budget'];
