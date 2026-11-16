/**
 * Site-wide settings and copy. Most text edits that aren't photo captions happen here.
 */

export const site = {
  name: 'Brendan Mayer Media',
  photographer: 'Brendan Mayer',
  /** The big statement under the header slideshow; the homepage's main heading. */
  intro: 'I photograph live music, sports, and events on Vancouver Island.',
  /** The line under the Gallery heading. */
  galleryIntro:
    'Concerts, sports, festivals and events from Vancouver Island and beyond. Tap any photo to see it full screen.',
  description:
    'Brendan Mayer is a concert, sports, festival and event photographer based in Victoria, BC, working with artists, promoters, venues and teams.',
  location: 'Victoria, BC',
  serviceArea: 'Based in Victoria, BC. Available across Vancouver Island and beyond.',
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
  shareImage: { gallery: 'festivals', file: 'brendan-red-smoke.jpg' },
  /**
   * Unlisted preview mode for review before launch: pages ask search engines not to index them
   * and the sitemap isn't advertised. Set to false at launch.
   */
  preview: true,
} as const;

export const about = {
  heading: 'About',
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
    gallery: 'concerts',
    title: 'Concerts',
    text: 'Live coverage for artists, management, venues and promoters. First three songs or the full set, edited within 48 hours.',
    photos: [
      { file: 'brendan-sepia-guitar.jpg', x: 15 },
      { file: 'brendan-green-stage.jpg', x: 30 },
      { file: 'brendan-blue-haze-guitar.jpg' },
    ],
  },
  {
    gallery: 'sports',
    title: 'Sports',
    text: 'Game-day action for teams, leagues, athletes and media, plus team and promo shots.',
    photos: [
      { file: 'brendan-whitecaps-huddle.jpg', x: 45 },
      { file: 'brendan-swimmer.jpg' },
      { file: 'brendan-cirque-du-soleil.jpg', x: 70 },
    ],
  },
  {
    gallery: 'festivals',
    title: 'Festivals',
    text: 'Full-day or multi-day coverage of stages, crowds and atmosphere, with same-night selects for socials.',
    photos: [
      { file: 'brendan-crowd-silhouettes.jpg' },
      { file: 'brendan-purple-drums.jpg' },
      { file: 'brendan-orange-light.jpg', x: 5 },
    ],
  },
  {
    gallery: 'events',
    title: 'Events',
    text: 'Launches, galas, conferences and private celebrations. Speakers, guests and the room.',
    photos: [
      { file: 'brendan-ceremonial-dance.jpg', x: 100 },
      { file: 'brendan-bar-portrait.jpg', x: 60 },
      { file: 'brendan-mother-and-son.jpg' },
    ],
  },
];

/** Questions pre-filled into booking emails. */
export const bookingChecklist = ['Date', 'Venue / location', 'Type of event', 'What the photos are for', 'Budget'];
