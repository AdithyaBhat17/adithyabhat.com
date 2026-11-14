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
