# simonask.io

Personal blog and Sanity CMS for [simonask.io](https://simonask.io).

| Site | Branch | URL |
|------|--------|-----|
| Production | `main` | [simonask.io](https://simonask.io) |
| Staging | `staging` | [stage.simonask.io](https://stage.simonask.io) |

**GitHub:** [SimonAndreAsk/simon-ask-personal-project](https://github.com/SimonAndreAsk/simon-ask-personal-project)

## Repository structure

| Folder | Purpose |
|--------|---------|
| `nextjs-simonask.io/` | Public website (Next.js 16) |
| `studio-simonask.io/` | Sanity Studio (content editing) |

## How code and content ship

**Code** (layout, features) follows Git:

1. Work on `staging` → deploys to **stage.simonask.io**
2. Merge `staging` → `main` → deploys to **simonask.io**

**Articles** follow Sanity:

1. Write in Studio → **Save** (draft)
2. Preview on staging (and in Studio **Presentation**)
3. **Publish** in Studio → live on **simonask.io** (webhook revalidates the site)

Draft posts are visible on staging only, not on production.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

## Local development

### Website

```bash
cd nextjs-simonask.io
npm install
cp .env.example .env.local   # add SANITY_API_READ_TOKEN for draft preview
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Sanity Studio

```bash
cd studio-simonask.io
npm install
cp .env.example .env.local   # SANITY_STUDIO_PROJECT_ID (same ID as the website)
npm run dev
```

Open [http://localhost:3333](http://localhost:3333). Project settings (including project ID) are at [sanity.io/manage](https://www.sanity.io/manage).

## Environment variables and secrets

- **Do not commit** `.env`, `.env.local`, API tokens, or private keys.
- Sanity **project ID** and **dataset** live in `.env.local` (see `.env.example` in each app). They are not secret, but are kept out of the repo.
- **Viewer token** and **revalidate secret** are required for draft preview and fast publish — see `.env.example` in each app folder and `nextjs-simonask.io/README.md`.

## Deployment

- **Vercel** — import repo, **Root Directory** `nextjs-simonask.io`
- **Domains** — `simonask.io` on Production (`main`); `stage.simonask.io` on Preview (`staging`)
- **DNS** — Cloudflare pointing to Vercel
- **Sanity** — CORS origins, API token, webhook → `/api/revalidate` (see `studio-simonask.io/README.md`)

Studio: run locally, or `npm run deploy` in `studio-simonask.io` for `*.sanity.studio`.

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `nextjs-simonask.io` | `npm run dev` | Dev server |
| `nextjs-simonask.io` | `npm run build` | Production build |
| `studio-simonask.io` | `npm run dev` | Studio dev server |
| `studio-simonask.io` | `npm run deploy` | Deploy studio to `*.sanity.studio` |

Details: README in each subfolder.
