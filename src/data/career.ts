// The route so far. Used by the home "route" painting and the About page's
// service history. Positions are in the painting's Figma coordinates.

export interface Stop {
  company: string;
  year: string;
  role: string;
  /** Hand-written note next to the sign. */
  note: string;
  /** Longer line for the About service history ledger. */
  work: string;
  current?: boolean;
  desktop: { sign: [x: number, y: number, rot: number]; note: [x: number, y: number, w: number] };
  mobile: { sign: [x: number, y: number, rot: number]; note: [x: number, y: number, w: number] };
}

export const ROUTE: Stop[] = [
  {
    company: 'Betsol',
    year: '2019',
    role: 'Software Engineer',
    note: 'Leto DevOps tooling, SlingTV dashboards',
    work: 'Software Engineer. Leto DevOps tooling and SlingTV dashboards.',
    desktop: { sign: [140, 360, -2], note: [264, 478, 200] },
    mobile: { sign: [16, 292, -2], note: [214, 300, 160] },
  },
  {
    company: 'Softway',
    year: '2021',
    role: 'UX Engineer',
    note: 'the Culture+ measurement platform',
    work: 'UX Engineer. Designed and built the Culture+ measurement platform.',
    desktop: { sign: [472, 365, 1.5], note: [574, 484, 200] },
    mobile: { sign: [222, 548, 1], note: [44, 548, 150] },
  },
  {
    company: 'yellow.ai',
    year: '2022',
    role: 'SDE-2',
    note: 'a chat widget 300k people use daily',
    work: 'SDE-2. The chat widget used by 300k people a day, with WCAG AA and i18n.',
    desktop: { sign: [802, 376, -1.5], note: [888, 494, 160] },
    mobile: { sign: [16, 790, -1], note: [198, 792, 128] },
  },
  {
    company: 'yellow.ai',
    year: '2024 → now',
    role: 'SDE-3',
    note: 'agentic AI: Nexus, Forge, Analyze',
    work: 'SDE-3. Agentic AI products: Nexus, Forge, Analyze and the Search SDK.',
    current: true,
    desktop: { sign: [1142, 254, 1], note: [1244, 372, 190] },
    mobile: { sign: [213, 972, 1], note: [46, 1000, 140] },
  },
];
