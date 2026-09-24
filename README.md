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
│   ├── page.tsx              # Overview        → /
│   ├── not-found.tsx         # 404             → *
│   ├── api/universities/     # GET /api/universities (route handler)
│   ├── explore-universities/
│   │   ├── page.tsx          # → /explore-universities
│   │   └── [university]/
│   │       ├── page.tsx      # → /explore-universities/:university
│   │       └── [department]/page.tsx
│   ├── majors-and-careers/   # → /majors-and-careers (coming soon)
│   ├── scholarships/         # → /scholarships (coming soon)
│   └── compare/              # → /compare (coming soon)
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── shared/               # Sidebar, top bar, breadcrumbs, cards…
│   ├── universities/         # University-specific components
│   ├── info/                 # Overview info cards
│   └── explore-universities/ # Department detail components
├── hooks/                    # Client data hooks (use-universities)
├── lib/                      # i18n, theme, utils
├── data/                     # Seed data + types
├── services/                 # API client
├── locales/                  # kh.json / en.json translations
└── styles/                   # globals.css (Tailwind 4 + design tokens)
```

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
| Bun server `GET /api/universities`        | `app/api/universities/route.ts`                      |
