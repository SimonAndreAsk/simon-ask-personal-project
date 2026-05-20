# Decisions (ADRs)

Read when: unsure why the repo is structured a certain way. Add a short entry when you make a non-obvious choice.

## Format for new entries

```markdown
### YYYY-MM-DD — Title
**Context:** …
**Decision:** …
**Implications:** …
```

---

### Monorepo with separate Next and Studio packages

**Context:** Content editors use Sanity Studio; visitors use the Next site.

**Decision:** `studio-simonask.io/` and `nextjs-simonask.io/` as siblings under one git repo.

**Implications:** Two `package.json` files; run install/dev in each folder. Vercel only builds the Next app.

---

### Staging shows drafts without draft mode on every request

**Context:** Editors need to preview unpublished posts on stage.simonask.io.

**Decision:** `NEXT_PUBLIC_SITE_ENV=staging` + `SANITY_API_READ_TOKEN` enables preview client in `getSanityClient()` (see `load.ts`).

**Implications:** Production must not set `SITE_ENV=staging` or ship a viewer token.

---

### Content revalidation via webhook, not time-based only

**Context:** Posts should appear soon after publish.

**Decision:** Sanity webhook → signed `POST /api/revalidate` → `revalidatePath` for home and post slug.

**Implications:** `SANITY_REVALIDATE_SECRET` must match between Sanity webhook config and Vercel env.

---

### CSS variables + Tailwind `@theme inline`

**Context:** Shared design tokens for marketing and article typography.

**Decision:** Define tokens in `globals.css`; map to Tailwind in `@theme inline`. An earlier `html.dark` toggle was removed in favor of a single light palette (see next ADR).

**Implications:** Prefer semantic color utilities over hardcoded hex in components.

---

### Light-only public site (no dark mode)

**Context:** Site direction is a simple portfolio; maintaining ThemeProvider, blocking script, and toggle added cost without clear need.

**Decision:** Ship one light palette in `:root` only; remove `html.dark`, `ThemeProvider` / `ThemeScript` / `ThemeToggle`, and `localStorage.theme`.

**Implications:** If dark mode returns, reintroduce a dark token block + class on `html` and restore the previous pattern.

---

### Neutral taxonomy pills (no per-tag colors)

**Context:** Per-tag colors in Studio added editor overhead and visual noise on the homepage.

**Decision:** `projectTechnology` and `postCategory` are label-only; site renders neutral pills via `label-pills.tsx`.

**Implications:** Do not reintroduce color fields on taxonomy types without an explicit product ask.

---

### Resend sender on mail.simonask.io

**Context:** Resend requires a verified sending domain; apex `simonask.io` was not the verified sender.

**Decision:** Verify `mail.simonask.io` in Resend; default `CONTACT_FROM_EMAIL` / `contactFromEmail` → `hello@mail.simonask.io`.

**Implications:** Production Vercel must have non-empty `RESEND_API_KEY`; see `memories/contact-form.md`.

---

### Homepage list thumbnails hidden

**Context:** Card layout is text-forward; thumbnails made posts/projects feel like media tiles, not readable entries.

**Decision:** `post-list` and `project-list` omit cover images on all breakpoints.

**Implications:** Card spacing and tags carry hierarchy; see `memories/homepage-cards.md`.

---

### Experience/education: card chrome, timeline layout

**Context:** User wanted project-like cards but kept title + period on one row.

**Decision:** `profile-timeline.tsx` uses the shared card shell without logos; period stays right of title.

**Implications:** Do not re-add `CompanyLogo` on the site when schema still has logo fields.
