# MES Mock Exam

Mock exam site for Cambodian university entrance exams (ITC, UHS, RUPP, IFL).

Built with Bun, React 19, React Router 7, Tailwind CSS 4, and shadcn/ui.

## Setup

```bash
bun install
```

## Development

Starts a server with hot reloading:

```bash
bun run dev
```

## Production

```bash
bun run build   # bundles the app into dist/
bun start       # serves the app without hot reloading
```

## Project layout

- `src/index.ts` — Bun HTTP server (static files + API stubs)
- `src/frontend.tsx` — React entry point
- `src/App.tsx` — routes
- `src/pages/` — route-level pages
- `src/components/` — shared, dashboard, history, and shadcn/ui primitives
- `src/data/` — institutions and exam subjects
- `src/lib/` — i18n, theme, and utility helpers
- `src/locales/` — Khmer/English strings (keep key parity between the two)
- `public/` — static images and icons
- `src/styles/` — Tailwind entry points and design tokens

## Deployment (Vercel)

```bash
# Install Vercel CLI
bun x vercel login

# Build and deploy to production
bun run build && bun x vercel --prod

# Deploy preview (non-production, from any branch)
bun x vercel

# List deployments
bun x vercel ls

# View project URL
bun x vercel alias ls

# Remove link to Vercel project
bun x vercel unlink
```

Pushing to `main` triggers a preview deployment. Use `bun x vercel --prod` to promote to production.