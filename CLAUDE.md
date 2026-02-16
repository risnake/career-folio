# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start dev server at localhost:4321
bun build      # Production build to ./dist/
bun preview    # Preview production build locally
```

## Architecture

Astro 5 static site with React islands and Tailwind CSS v4. Uses bun as the package manager.

### Stack
- **Astro** for static pages (file-based routing in `src/pages/`)
- **React** for interactive components (only `ActionVerbBrowser.tsx` uses `client:load`)
- **Tailwind CSS v4** via Vite plugin (configured in `astro.config.mjs`, not `tailwind.config`)
- **Fonts**: Instrument Serif (display) + Outfit (body), loaded from Google Fonts in `Layout.astro`

### Key Structure
- `src/layouts/Layout.astro` — shared shell with Nav, Footer, and scroll-reveal IntersectionObserver script
- `src/components/Nav.astro` — sticky nav with mobile hamburger menu (vanilla JS)
- `src/components/Footer.astro` — site footer
- `src/data/` — typed data arrays (`resumes.ts`, `coverLetters.ts`, `actionVerbs.ts`) consumed by pages
- `src/styles/global.css` — custom theme colors, editorial typography classes, and animations

### Design System
The site uses a custom color palette defined in `global.css` via `@theme`:
- `ink`, `paper`, `cream`, `terracotta`, `forest`, `muted`, `rule`, `warm-white`
- Custom classes: `display-xl`, `display-lg`, `display-md`, `label-sm`, `body-lg`, `grain`, `paper-card`, `rule-accent`, `callout`, `badge-terracotta`, `badge-forest`, `link-underline`, `section-num`
- Scroll reveal: elements with `.reveal`, `.reveal-fade`, `.reveal-left` animate on scroll; `.stagger` adds cascading delays

Content pages use standard Tailwind utility classes (`text-slate-900`, `bg-amber-600`, etc.) with a consistent pattern: `h1` + amber accent bar + card-based layouts.
