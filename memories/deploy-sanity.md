# Deploy Sanity

Read when: the user says **Deploy Sanity** (any casing).

## Meaning

Publish **hosted Sanity Studio** (`https://simonask.sanity.studio`) with whatever Studio changes exist in the repo — schema, desk structure, Presentation config, plugins, Studio UI.

This does **not** ship the Next.js site. For the public site, the user says **Go Live** (git → Vercel).

## What gets deployed

| Included | Not included |
|----------|----------------|
| `studio-simonask.io/` — `schemaTypes/`, `sanity.config.ts`, `structure.ts`, `presentation/`, plugins | `nextjs-simonask.io/` — use **Go Live** |
| Studio build baked into `*.sanity.studio` | Document **content** — editors **Publish** in Studio; webhook revalidates the site |

## Steps (agent)

1. `git status` — confirm there are Studio changes under `studio-simonask.io/` (or user explicitly wants a redeploy anyway).
2. From repo root, run hosted Studio deploy (never from monorepo root only):

   ```powershell
   cd studio-simonask.io
   npm run deploy
   ```

3. If the CLI prompts for hostname, use **`simonask`** → `https://simonask.sanity.studio` (not `simonaskio`).
4. Report success and remind the user:
   - **Publish** documents in Studio for content to go live on the site.
   - **Go Live** if Next.js code also changed (GROQ, pages, visual editing, etc.).

## Prerequisites

- Logged into Sanity CLI (`npx sanity login`) if deploy fails with auth errors.
- Network access for `sanity deploy`.

## Do not

- Run `npm run deploy` from the monorepo root (script lives in `studio-simonask.io`).
- Confuse this with **Go Live** (git push to `staging` / `main`).
- Commit `.env.local` or tokens.

## Related

- Hosted Studio URL and CORS: `studio-simonask.io/README.md`
- Schema / publish / webhooks: `memories/sanity-conventions.md`
- Site ship: `memories/go-live.md`
