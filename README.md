# Career Folio

A modern resume builder with AI enhancement powered by Astro, React, and Cloudflare Pages.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   │   └── builder/       # Resume builder components
│   ├── data/              # Action verbs, sample resumes
│   ├── lib/               # State management and utilities
│   ├── pages/
│   │   ├── api/           # Server-side API routes
│   │   └── *.astro        # Static pages
│   └── styles/
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`      |
| `bun build`               | Build your production site to `./dist/`          |
| `bun preview`             | Preview your build locally, before deploying     |
| `bun astro ...`           | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help`     | Get help using the Astro CLI                     |

## 🔑 Environment Setup

### AI Enhancement Feature

The resume builder includes AI-powered text enhancement that requires an OpenRouter API key. An AI chat intake flow
exists in the codebase, but its UI is currently hidden on `/builder` until the feature is finalized.

#### Local Development

Create a `.dev.vars` file in the project root:

```
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/auto:free
```

The `.dev.vars` file is gitignored and used by Wrangler for local development.

#### Production (Cloudflare Pages)

1. Go to your Cloudflare Pages project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `OPENROUTER_API_KEY` - Your OpenRouter API key (required)
   - `OPENROUTER_MODEL` - Model identifier (optional, defaults to `openrouter/auto:free`)
4. Redeploy your application for the changes to take effect

**Note**: Environment variables in Cloudflare Pages are accessed at runtime through `locals.runtime.env`, not at build time. Make sure to set them as **Environment Variables** (not Build Variables) in the Cloudflare dashboard.

#### Getting an OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Add credits to your account (pay-as-you-go pricing)

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).
