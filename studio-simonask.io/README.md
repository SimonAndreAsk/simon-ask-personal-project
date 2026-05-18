# simonask.io — Sanity Studio

Content studio for the simonask.io blog. Schema lives in `schemaTypes/`.

- **Project ID:** `au2uzesy`
- **Dataset:** `production`

The project ID is a public identifier, not a secret.

## Setup

```bash
npm install
npm run dev
```

Open the local URL from the terminal (typically [http://localhost:3333](http://localhost:3333)).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local studio |
| `npm run build` | Production build |
| `npm run deploy` | Host studio on `*.sanity.studio` |
| `npm run start` | Serve production build |

## Environment variables

Studio usually needs no `.env` file for local development when `projectId` and `dataset` are set in `sanity.config.ts`.

For CI or deploy tokens, use `.env` locally only — see `.env.example`. **Never commit** real tokens.

```bash
cp .env.example .env
```

## CORS (production)

In [sanity.io/manage](https://www.sanity.io/manage) → API → CORS origins, allow:

- `https://simonask.io`
- `https://www.simonask.io`
- Your Vercel preview URL (if you use the studio in the browser on that host)

## Content model

- **Post** — `schemaTypes/postType.ts` (title, slug, date, image, body)

Publish posts in the studio; the Next.js site picks them up on the next build/deploy.
