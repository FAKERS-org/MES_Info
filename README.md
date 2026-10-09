# MES Universities

University information portal for Cambodian universities, built with **Next.js 15 (App Router)**, React 19, Tailwind CSS 4 and TypeScript.

## Features

- 🎓 Browse universities, departments, curricula, scholarships and career paths
- 🌐 Khmer / English bilingual UI (persisted in `localStorage`)
- 🌗 Light / dark theme with no-flash inline script (persisted in `localStorage`)
- 📱 Responsive dashboard layout with collapsible sidebar
- ⚡ Route handlers, server-rendered pages, client components where interactive

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (providers + theme script)
│   ├── app-shell.tsx         # Dashboard chrome (sidebar/topbar/breadcrumbs)
│   ├── page.tsx              # University listing → /
│   ├── not-found.tsx         # 404             → *
│   ├── explore-universities/
│   │   ├── page.tsx          # → /explore-universities
│   │   └── [university]/
│   │       ├── page.tsx      # → /explore-universities/:university
│   │       └── [department]/page.tsx
│   ├── majors-and-careers/   # → /majors-and-careers (coming soon)
│   ├── scholarships/         # → /scholarships (coming soon)
│   └── compare/              # → /compare (coming soon)
├── config/                   # Central config (API_CONFIG.baseUrl = MES API URL)
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── shared/               # Sidebar, top bar, breadcrumbs, cards…
│   ├── universities/         # University-specific components
│   ├── info/                 # Overview info cards
│   └── explore-universities/ # Department detail components
├── hooks/                    # Client data hooks (use-universities)
├── lib/
│   ├── api/                  # API layer — see "Fetching data from the API"
│   │   ├── schema.d.ts       # Generated TS types from the OpenAPI spec
│   │   ├── client.ts         # Client-side axios instance
│   │   ├── fetch.ts          # Server-side typed fetch helper
│   │   └── universities.ts   # University resource: fetchers + mappers
│   ├── i18n.tsx, theme.ts, utils.ts …
├── data/                     # Seed data + UI domain types
├── locales/                  # kh.json / en.json translations
└── styles/                   # globals.css (Tailwind 4 + design tokens)
```

## Fetching data from the API

The external MES API (FastAPI, default `http://localhost:8000/api/v1`, override
with `NEXT_PUBLIC_API_URL`) is the source of truth. Response types come from its
OpenAPI spec — never hand-write them:

```bash
npm run generate-api   # regenerates src/lib/api/schema.d.ts (needs the API running)
```

Two clients, two worlds — pick by where the data is consumed:

| Component runs…            | Use                                              | Lives in                 |
| -------------------------- | ------------------------------------------------ | ------------------------ |
| Server Component (default) | `apiFetch` from `@/lib/api/fetch`                | `src/lib/api/<resource>.ts` |
| Client Component (`"use client"`) | `apiClient` (axios) via a react-query hook | `src/hooks/use-<resource>.tsx` |

Rules:

1. **Never fetch inside a component.** Server pages call functions from
   `src/lib/api/`; client components consume a hook from `src/hooks/`.
2. **One module per resource** in `src/lib/api/` (see `universities.ts`): typed
   fetchers (`getUniversityDetail`) plus mappers (`toHeadingData`, `buildUnitTree`)
   that translate the API's snake_case into the shapes the UI already types
   against in `@/data`.
3. **Server by default.** Only reach for the axios client when a client
   component truly needs fresh/interactive data; everything else renders on
   the server with `next.revalidate` caching.

### Adding a new resource (e.g. `programs`)

1. Regenerate types: `npm run generate-api`
2. Server fetchers — `src/lib/api/programs.ts`:

```ts
import { apiFetch } from "@/lib/api/fetch";
import type { components } from "@/lib/api/schema";

export type ProgramDetail = components["schemas"]["ProgramDetail"];

export function getProgram(id: string): Promise<ProgramDetail | null> {
    return apiFetch<ProgramDetail>(`/programs/${encodeURIComponent(id)}`);
}
```

3. Client data (only if a client component needs it) — `src/hooks/use-programs.tsx`,
   mirroring `use-universities.tsx`: `apiClient.get` + `useQuery` + a context provider.
4. Use it: `const program = await getProgram(id)` in a Server Component.

## Routing

Pages use the filesystem-based App Router instead of `react-router-dom`:

| Old (react-router)                        | New (App Router)                                     |
| ----------------------------------------- | ---------------------------------------------------- |
| `/` (index route)                         | `app/page.tsx`                                       |
| `explore-universities/:university`        | `app/explore-universities/[university]/page.tsx`     |
| `explore-universities/:university/:dept`  | `app/explore-universities/[university]/[department]` |
| `path: "*"` catch-all                     | `app/not-found.tsx`                                  |
| `<Outlet />` in root layout               | `children` in `app/layout.tsx`                       |
| `Link to=` / `useNavigate` / `useLocation`| `next/link` `href` / `usePathname` / `useParams`     |
| Bun server `GET /api/universities`        | Client hits the external API directly (`lib/api/`)   |
