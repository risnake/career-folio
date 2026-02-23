# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start dev server at localhost:4321
bun build      # Production build to ./dist/
bun preview    # Preview production build locally (runs wrangler pages dev)
```

`bun preview` requires `bun build` first. It uses Wrangler (not `astro preview`) because the Cloudflare adapter doesn't support Astro's built-in preview server.

## Architecture

Astro 5 site with React islands, Tailwind CSS v4, and the Cloudflare Pages adapter. Uses bun as the package manager. All pages are statically prerendered except `src/pages/api/enhance.ts` which is a server-side Cloudflare Worker endpoint (`prerender = false`).

### Stack
- **Astro** for static pages (file-based routing in `src/pages/`)
- **React** for interactive components (`client:load` on `ActionVerbBrowser` and `ResumeBuilder`)
- **Tailwind CSS v4** via Vite plugin (configured in `astro.config.mjs`, no `tailwind.config` file)
- **Cloudflare Pages** adapter for the `/api/enhance` server route
- **Fonts**: Instrument Serif (display) + Outfit (body), loaded from Google Fonts in `Layout.astro`

### Two React Islands
1. **ActionVerbBrowser** (`src/components/ActionVerbBrowser.tsx`) — filterable verb reference on `/action-verbs`
2. **ResumeBuilder** (`src/components/builder/ResumeBuilder.tsx`) — multi-step wizard on `/builder` with all state managed by a single `useReducer` (`src/lib/builderReducer.ts`)

### Resume Builder Architecture
The builder is the largest feature. Key data flow:

- **State**: `BuilderState` type in `src/lib/builderTypes.ts`, managed by `builderReducer.ts`, initialized from `resumeDefaults.ts`
- **Validation**: `src/lib/validation.ts` — `validateStep(step, state)` gates wizard progression
- **Steps** (`src/components/builder/steps/`): 8 step components (Template → Contact → Objective → Education → Experience → Skills → AdditionalInfo → Preview). Each receives `dispatch` and relevant state slices as props.
- **Shared form primitives** (`src/components/builder/shared/`): `FormField`, `FormTextarea`, `DynamicList` (render prop), `BulletEditor`, `ValidationMessage`
- **AI enhancement** (`src/components/builder/ai/`): `useEnhance` hook calls `/api/enhance`, which proxies to OpenRouter. `EnhanceButton` and `SuggestionPanel` handle the UI.
- **Preview** (`src/components/builder/preview/`): Three HTML template renderers (Chronological, Functional, Combination) dispatched by `ResumePreview`
- **Export** (`src/components/builder/export/`): `PdfExport` uses `@react-pdf/renderer` with three PDF template components. `DocxExport` uses the `docx` package. Both use `file-saver` for download.
- **AI chat intake**: `src/components/builder/AssistantChat.tsx` and `/api/builder-chat` remain in the codebase, but the chat UI is currently hidden on `/builder` until the feature is finalized.

Note: `file-saver` is a CommonJS module. Use `import pkg from 'file-saver'; const { saveAs } = pkg;` for static imports, or `const { saveAs } = await import('file-saver')` for dynamic imports.

### Data Layer
- `src/data/resumes.ts` — 14 sample resumes with typed interfaces (`Resume`, `ResumeContact`, `Education`, `ExperienceItem`, `ResumeSection`). The builder reuses these same types.
- `src/data/actionVerbs.ts` — 200+ verbs in 11 categories, used by the verb browser page and the AI enhance system prompt
- `src/data/coverLetters.ts` — cover letter samples

### Design System
Custom color palette defined in `src/styles/global.css` via `@theme`:
- Colors: `ink`, `paper`, `cream`, `terracotta`, `forest`, `muted`, `rule`, `warm-white`
- Custom classes: `display-xl`, `display-lg`, `display-md`, `label-sm`, `body-lg`, `grain`, `paper-card`, `rule-accent`, `callout`, `badge-terracotta`, `badge-forest`, `link-underline`, `section-num`
- Scroll reveal: elements with `.reveal`, `.reveal-fade`, `.reveal-left` animate on scroll; `.stagger` adds cascading delays
- Content pages use: `h1` + amber accent bar (`h-1 w-12 bg-amber-500 rounded`) + card-based layouts

### Environment Variables
**Local Development**: Create a `.dev.vars` file in the project root with:
```
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=openrouter/free
```

**Production (Cloudflare Pages)**: Set environment variables in the Cloudflare Pages dashboard:
1. Go to your Cloudflare Pages project → Settings → Environment Variables
2. Add `OPENROUTER_API_KEY` (required for AI enhance) — your OpenRouter API key
3. Add `OPENROUTER_MODEL` (optional, defaults to `openrouter/free`) — model identifier

**Important**: The `/api/enhance` endpoint accesses runtime environment variables through `locals.runtime.env` (Cloudflare's runtime binding), NOT through `import.meta.env` which only works for build-time variables. Secrets set in the Cloudflare dashboard are automatically available at runtime through this binding.

### Cloudflare Config
`wrangler.jsonc` requires `nodejs_compat` compatibility flag because Astro's server bundle references Node built-ins through the sharp image dependency.
