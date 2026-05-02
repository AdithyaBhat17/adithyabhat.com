// Single source of truth for social profile URLs. Imported by Footer (text
// links), Socials (icon row), and CommandPalette (search palette items).

export interface SocialLink {
  name: string;
  href: string;
}

export const socialLinks: readonly SocialLink[] = [
  { name: 'Behance', href: 'https://behance.net/adithyabhat' },
  { name: 'Dribbble', href: 'https://dribbble.com/adithyanr' },
  { name: 'Twitter', href: 'https://twitter.com/adithya__nr' },
  { name: 'GitHub', href: 'https://github.com/adithyabhat17' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/adithya-nr' },
  { name: 'YouTube', href: 'https://www.youtube.com/@adithya-bhat' },
];
