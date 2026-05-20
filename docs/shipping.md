# Shipping: code vs content

Two separate paths — confusing them is a common mistake.

## Code (layout, features, APIs)

**Tool:** Git + Vercel  
**Branches:** `staging` → **stage.simonask.io**, then `main` → **simonask.io**

| Step | You |
|------|-----|
| 1 | Work on branch `staging` |
| 2 | Test locally (`npm run dev` in `nextjs-simonask.io/`) |
| 3 | In Cursor: **Go Live** (or follow [memories/go-live.md](../memories/go-live.md)) |

Vercel **Root Directory** must stay `nextjs-simonask.io` ([memories/architecture.md](../memories/architecture.md)).

## Content (posts, projects in Sanity)

**Tool:** Sanity Studio — **Publish**  
**Not** shipped by merging Git (drafts vs published live in Sanity)

| Step | You |
|------|-----|
| 1 | Edit in `studio-simonask.io/` (local or hosted Studio) |
| 2 | **Save** = draft; preview on staging / Presentation |
| 3 | **Publish** → webhook revalidates the Next site |

Draft posts appear on **staging** only when the site env is configured for preview — not on production.

## Studio UI deploy (optional)

When **Studio code** changed (schema, desk, plugins), say **Deploy Sanity** or run `npm run deploy` in `studio-simonask.io/` — see [memories/deploy-sanity.md](../memories/deploy-sanity.md).

Combined: **Deploy Sanity** then **Go Live** ([memories/go-live.md](../memories/go-live.md) § Go Live and Deploy Sanity).

## Quick reference

| I changed… | Ship with |
|------------|-----------|
| `nextjs-simonask.io/` code | **Go Live** (Git) |
| Sanity document content | Studio **Publish** |
| `studio-simonask.io/` schema/UI | **Deploy Sanity** (+ Go Live if site also changed) |

## Related

- [cursor-memories-and-skills.md](./cursor-memories-and-skills.md) — Go Live skill
- [repo-map.md](./repo-map.md) — which folder is site vs Studio
