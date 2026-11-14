import { BUILDS, type BuildMeta } from '@/data/builds';

/** "Hey Homero • Live more, clean less." → "Hey Homero" */
export function shortTitle(title: string): string {
  return title.split(/\s+[•|–—]\s+/)[0].trim();
}

/** "Design / Development, analytics" → "Design · Development · Analytics" */
export function tagLine(tags: string | undefined): string {
  if (!tags) return '';
  return tags
    .split(/[,/]/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(' · ');
}

const STAMPS: Record<string, BuildMeta['stamp']> = { in_use: 'In use daily', shipped: 'Shipped', retired: 'Retired' };

export interface ProjectCmsFields {
  slug: string;
  link?: string;
  oneLiner?: string;
  role?: string;
  builtWith?: string;
  stamp?: string;
  builtFor?: string;
}

/**
 * Build-sheet details: from the CMS once a record is filled in (one_liner set),
 * otherwise from the local fallback in src/data/builds.ts.
 */
export function buildMeta(p: ProjectCmsFields): BuildMeta | undefined {
  const local = BUILDS[p.slug];
  if (!p.oneLiner) return local;
  const group = p.builtFor === 'me' || p.builtFor === 'work' ? p.builtFor : 'clients';
  return {
    group,
    oneLiner: p.oneLiner,
    role: p.role || local?.role || '',
    builtWith: p.builtWith || local?.builtWith || '',
    stamp: STAMPS[p.stamp ?? ''] ?? local?.stamp ?? 'Shipped',
    visit: local?.visit ?? (group === 'me' && Boolean(p.link)),
  };
}
