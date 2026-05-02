## adithyabhat.com

Source code for my personal portfolio and blog.

### Stack

- [Astro](https://astro.build) with View Transitions
- React (interactive islands)
- Tailwind CSS v4
- TypeScript
- [DatoCMS](https://www.datocms.com) (content)
- Vitest (testing)
- Deployed on [Vercel](https://vercel.com)

### Getting started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Type-check and build
pnpm build
```

### Project structure

```
src/
  components/   # Astro + React components
  layouts/      # Base and page layouts
  pages/        # File-based routing
  scripts/      # Client-side JS (animations, easter eggs, click feedback)
  lib/          # Server utilities (DatoCMS client, spam filter, sanitizer)
  utils/        # Shared data (socials, companies)
  graphql/      # DatoCMS queries
  styles/       # Global CSS
  types/        # TypeScript interfaces
```
