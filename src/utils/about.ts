export interface Company {
  name: string;
  path: string;
  /** Optional alternate logo shown on hover (e.g. colorful brand variant). */
  hoverPath?: string;
  /** When true, keep the white-mono treatment on hover instead of revealing the original colors. */
  stayMono?: boolean;
}

export const companies: Company[] = [
  { name: 'Yellow.ai', path: '/static/yellow_ai_brand_dark.webp', stayMono: true },
  { name: 'Daikin', path: '/static/daikin.svg' },
  { name: 'Softway', path: '/static/softway.svg', stayMono: true },
  { name: 'Dish', path: '/static/dish.svg' },
  { name: 'Betsol', path: '/static/betsol_logo.svg', stayMono: true },
  { name: 'Homero', path: '/static/Homero.svg' },
];
