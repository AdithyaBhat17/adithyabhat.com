// Build-sheet details for each project, keyed by DatoCMS slug. The CMS holds
// the title, tags, date, thumbnail, link and case study; this holds the
// garage-journal extras the CMS has no fields for. A project with no entry
// still renders, from CMS data alone, in "Built for clients".

export interface BuildMeta {
  group: 'me' | 'work' | 'clients';
  oneLiner: string;
  role: string;
  builtWith: string;
  stamp: 'In use daily' | 'Shipped' | 'Retired';
  /** Show the CMS link as "Visit <host>" instead of "Read the build log". */
  visit?: boolean;
}

export const BUILDS: Record<string, BuildMeta> = {
  olympus: {
    group: 'me',
    oneLiner: 'my workout log, with Claude as my trainer',
    role: 'Design and build',
    builtWith: 'Next.js PWA, Claude via an MCP server',
    stamp: 'In use daily',
  },
  'daily-planner': {
    group: 'me',
    oneLiner: 'a paper planner that syncs with my calendar',
    role: 'Design and build',
    builtWith: 'Turborepo, Next.js, Expo, Google Calendar',
    stamp: 'In use daily',
    visit: true,
  },
  cortex: {
    group: 'me',
    oneLiner: 'WHOOP and Withings, finally in one place',
    role: 'Design and build',
    builtWith: 'Next.js, Supabase, 17 charts',
    stamp: 'In use daily',
    visit: true,
  },
  'hey-homero-live-more-clean-less': {
    group: 'clients',
    oneLiner: 'landing page and price estimator for an NYC cleaning startup',
    role: 'Development and analytics',
    builtWith: 'Built from the client’s designs',
    stamp: 'Shipped',
  },
  'homero-book-house-cleaning-online': {
    group: 'clients',
    oneLiner: 'cut the booking flow from 8 steps to 4',
    role: 'Design, development, analytics',
    builtWith: 'Booking web app, multiple coupon types',
    stamp: 'Shipped',
  },
};
