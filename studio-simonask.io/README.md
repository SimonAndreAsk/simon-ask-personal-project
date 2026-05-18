# simonask.io — Sanity Studio

Content studio for the simonask.io blog.

Project ID and dataset are set in `.env.local` (see `.env.example`). Use the same project ID as the Next.js app.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `.env.local` before running.

Open [http://localhost:3333](http://localhost:3333).

Optional: `SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000` (or `https://stage.simonask.io` for staging preview).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local studio |
| `npm run build` | Production build |
| `npm run deploy` | Host studio on `*.sanity.studio` |
| `npm run start` | Serve production build |

## Studio navigation

| Section | Purpose |
|---------|---------|
| **Drafts** | Unpublished posts |
| **Published** | Live on simonask.io |
| **All posts** | Full list |
| **Presentation** | Live preview of the website in an iframe |

## Writing workflow

1. **Content → Drafts → Create** — add title, slug, body → **Save**
2. **Presentation** tab — preview on the site (enable draft mode via the Next.js app)
3. Check **stage.simonask.io** for draft visibility (staging deployment only)
4. **Publish** — post appears on **simonask.io** (webhook revalidates the site)

Unpublished drafts do **not** appear on production.

## Content model

**Post** — `schemaTypes/postType.ts`

- `title`, `slug`, `publishedAt`, `image`, `body` (portable text)

## CORS

In [sanity.io/manage](https://www.sanity.io/manage) → API → **CORS origins**, allow with **credentials**:

- `http://localhost:3000`
- `http://localhost:3333`
- `https://simonask.io`
- `https://www.simonask.io`
- `https://stage.simonask.io`
- Your `*.sanity.studio` URL if using `npm run deploy`

## Presentation tool

Configured in `sanity.config.ts` with:

- `structure.ts` — desk structure (Drafts / Published)
- `presentation/resolve.ts` — maps posts to `/{slug}` and home to `/`
- Preview enable URL: `/api/draft-mode/enable` on the Next.js site

## Related docs

- Repo root `README.md` — overview
- `nextjs-simonask.io/README.md` — env vars, Vercel, webhooks
