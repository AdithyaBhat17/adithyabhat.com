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
        <h1 className="font-serif text-4xl md:text-5xl">My Toolbox</h1>
        <div className="bg-[var(--secondary)] px-4 py-2 rounded-[var(--radius)]">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent cursor-pointer font-sans text-sm outline-none"
          >
            {['All categories', ...categories].map((cat, i) => (
              <option key={`${cat}-${i}`} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((stack) => (
          <a
            key={stack.id}
            href={stack.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start rounded-[var(--radius)] px-2 py-4 sm:px-4 hover:bg-[var(--secondary)] transition-colors group"
          >
            {stack.logo?.url && (
              <img
                width="50"
                height="50"
                loading="lazy"
                alt={`${stack.product} brand icon`}
                title={stack.product}
                src={stack.logo.url}
                className="w-[50px] h-[50px] rounded-lg object-contain flex-shrink-0"
              />
            )}
            <div className="pl-5 space-y-1">
              <h2 className="font-sans font-semibold text-[var(--foreground)] group-hover:text-[#153ec4] transition-colors">
                {stack.product}
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm font-sans">
                {stack.description}
              </p>
              <span className="inline-block text-xs bg-[var(--secondary)] px-2 py-1 rounded-sm text-[var(--muted-foreground)]">
                {stack.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
