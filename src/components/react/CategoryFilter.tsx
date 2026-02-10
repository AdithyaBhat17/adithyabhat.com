import { useState, useMemo } from 'react';
import type { Stack } from '@/types/use';

interface Props {
  stacks: Stack[];
  categories: string[];
}

export default function CategoryFilter({ stacks, categories }: Props) {
  const [selectedCategory, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All categories') return stacks;
    return stacks.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, stacks]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-10 gap-4">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight">My Toolbox</h1>
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-2 rounded-[var(--radius)]">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent cursor-pointer font-body text-sm text-[var(--text)] outline-none"
          >
            {['All categories', ...categories].map((cat, i) => (
              <option key={`${cat}-${i}`} value={cat} className="bg-[var(--bg-elevated)] text-[var(--text)]">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        {filtered.map((stack) => (
          <a
            key={stack.id}
            href={stack.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start rounded-[var(--radius)] px-4 py-4 hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border)] transition-all group"
          >
            {stack.logo?.url && (
              <img
                width="44"
                height="44"
                loading="lazy"
                alt={`${stack.product} brand icon`}
                title={stack.product}
                src={stack.logo.url}
                className="w-[44px] h-[44px] rounded-lg object-contain flex-shrink-0"
              />
            )}
            <div className="pl-4 space-y-1">
              <h2 className="font-body font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {stack.product}
              </h2>
              <p className="text-[var(--text-muted)] text-sm font-body leading-relaxed">
                {stack.description}
              </p>
              <span className="inline-block text-xs bg-[var(--bg-surface)] border border-[var(--border)] px-2 py-0.5 rounded text-[var(--text-muted)]">
                {stack.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
