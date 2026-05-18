# simonask.io — Website

Next.js blog for [simonask.io](https://simonask.io). Content is loaded from Sanity (project `au2uzesy`, dataset `production`).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Environment variables

Published posts are read with the public Sanity API. **No env file is required** for a basic deploy.

If you add preview mode, webhooks, or private datasets later, copy `.env.example` to `.env.local` and fill in values. **Never commit** `.env.local`.

```bash
cp .env.example .env.local
```

## Deploy on Vercel

1. Connect this repository to Vercel.
2. Set **Root Directory** to `nextjs-simonask.io`.
3. Framework preset: **Next.js** (auto-detected).
4. Add domains `simonask.io` and `www.simonask.io`.
5. In Cloudflare DNS, add the records Vercel provides (grey-cloud / DNS-only is simplest).

After you publish posts in Sanity, redeploy (or set up a Sanity webhook to trigger rebuilds).

## Project layout

```
src/
  app/           # Pages and routes
  components/    # UI components
  lib/           # Helpers (contact email, dates)
  sanity/        # Sanity client
```

## Contact email

Public address: `hello@simonask.io` — defined in `src/lib/contact.ts`.
