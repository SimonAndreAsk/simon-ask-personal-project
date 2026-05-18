# simonask.io

Personal blog and Sanity CMS for [simonask.io](https://simonask.io).

## Repository structure

| Folder | Purpose |
|--------|---------|
| `nextjs-simonask.io/` | Public website (Next.js) |
| `studio-simonask.io/` | Sanity Studio (content editing) |

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

## Local development

### Website

```bash
cd nextjs-simonask.io
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Sanity Studio

```bash
cd studio-simonask.io
npm install
npm run dev
```

Open the URL shown in the terminal (usually [http://localhost:3333](http://localhost:3333)).

You can also manage content at [sanity.io/manage](https://www.sanity.io/manage) → project **au2uzesy**.

## Environment variables and secrets

- **Do not commit** `.env`, `.env.local`, API tokens, or private keys.
- These patterns are listed in `.gitignore` at the repo root and in each app folder.
- The Sanity **project ID** and **dataset** in code are public identifiers (safe to commit). They are not secret.
- Optional tokens (e.g. preview or write access) belong only in local `.env` files or in your host’s environment settings — see `.env.example` in each app folder.

## Deployment (overview)

Recommended: **Vercel** (website) + **Cloudflare** (DNS for `simonask.io`).

1. Push this repo to GitHub.
2. Import `nextjs-simonask.io` on Vercel (set **Root Directory** to `nextjs-simonask.io`).
3. Add custom domains in Vercel; point Cloudflare DNS to Vercel.
4. SSL is automatic on Vercel.
5. Studio: use `npm run dev` locally, `npm run deploy` for Sanity-hosted studio, or deploy `studio-simonask.io` as a second Vercel project.

Details: see README files in each subfolder.

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `nextjs-simonask.io` | `npm run dev` | Dev server |
| `nextjs-simonask.io` | `npm run build` | Production build |
| `studio-simonask.io` | `npm run dev` | Studio dev server |
| `studio-simonask.io` | `npm run deploy` | Deploy studio to `*.sanity.studio` |
