// How each article shows up as a risograph zine on the newsstand.
// Keyed by DatoCMS article slug. Articles without an entry fall back to a
// default cover and their first CMS tag.

export type ZineArt = 'cans' | 'atom' | 'braces' | 'coverage' | 'chat' | 'iterators' | 'variables' | 'functions';

export interface ZineStyle {
  art: ZineArt;
  /** Paper colour of the issue. */
  paper: string;
  /** Short topic label for the meta line. */
  topic: string;
  /** One-line standfirst used when the issue is the featured "latest". */
  dek?: string;
}

export const ZINES: Record<string, ZineStyle> = {
  'building-accessible-chatbots-at-yellow-ai': {
    art: 'chat',
    paper: '#f6eedd',
    topic: 'Accessibility',
    dek: 'How we made the yellow.ai chat widget, used by 300k people a day, meet WCAG AA.',
  },
  'introduction-to-javascript-iterators-and-generators': { art: 'iterators', paper: '#dce7e1', topic: 'JavaScript' },
  'generate-code-coverage-reports-for-your-unit-tests-using-jest': { art: 'coverage', paper: '#efe3c4', topic: 'Testing' },
  'intro-to-javascript': { art: 'braces', paper: '#f7d9c2', topic: 'JavaScript' },
  'javascript-variables': { art: 'variables', paper: '#f6eedd', topic: 'JavaScript' },
  'functions-in-javascript': { art: 'functions', paper: '#dce7e1', topic: 'JavaScript' },
  'a-beginner-s-guide-to-understanding-react-s-context-api': { art: 'atom', paper: '#dce7e1', topic: 'React' },
  'the-most-underrated-skill-for-a-developer-communication': { art: 'cans', paper: '#f6eedd', topic: 'Craft' },
};

const FALLBACK_ART: ZineArt[] = ['braces', 'atom', 'cans', 'functions'];

export function zineFor(slug: string | undefined, tags: string | undefined, index = 0): ZineStyle {
  const known = slug ? ZINES[slug] : undefined;
  if (known) return known;
  const topic = (tags ?? '').split(/[,/]/)[0]?.trim() || 'Notes';
  return { art: FALLBACK_ART[index % FALLBACK_ART.length], paper: '#f6eedd', topic };
}
