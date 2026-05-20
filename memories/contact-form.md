# Contact form (Resend)

Read when: contact form errors, Resend, `RESEND_API_KEY`, get-in-touch form, message not sent.

## File map

| Area | Path |
|------|------|
| API route | `nextjs-simonask.io/src/app/api/contact/route.ts` |
| Form UI | `nextjs-simonask.io/src/components/contact-form.tsx` |
| Constants | `nextjs-simonask.io/src/lib/contact.ts` |
| Footer section | `nextjs-simonask.io/src/components/site-footer.tsx` (`#get-in-touch`) |
| Env template | `nextjs-simonask.io/.env.example` |

## Env vars (names only — values in Vercel / `.env.local`)

| Var | Scope | Purpose |
|-----|-------|---------|
| `RESEND_API_KEY` | Server | Resend API bearer token |
| `CONTACT_FROM_EMAIL` | Server | Sender address (must use verified domain) |

**Production + Preview on Vercel** must both have `RESEND_API_KEY` set. An empty string on Vercel still deploys but returns **503** (“Contact form is not configured yet.”).

Local: copy from `.env.example` into `.env.local` (never commit).

## Resend setup

1. Verify domain **`mail.simonask.io`** in Resend → Domains.
2. Default sender in code: `hello@mail.simonask.io` (`contactFromEmail` in `contact.ts`). Override with `CONTACT_FROM_EMAIL` if needed.
3. Recipient: `hello@simonask.io` (`contactEmail` in `contact.ts`).

Route builds `from` as `Simon Ask <address>` when the env value has no angle brackets.

## API behavior

| Status | Meaning |
|--------|---------|
| 503 | Missing or empty `RESEND_API_KEY` |
| 400 | Invalid JSON or validation (name, email, message) |
| 200 `{ ok: true }` | Honeypot `company` filled (silent success) |
| 502 | Resend API error (wrong key, unverified domain, etc.) |
| 200 `{ ok: true }` | Sent |

Limits: name ≤ 120 chars, message ≤ 5000 chars.

## Debug checklist (agent)

1. Confirm route exists on deployed branch (`main` / `staging`).
2. `POST https://simonask.io/api/contact` with minimal valid JSON — note status + body (no secrets in chat).
3. Vercel → Project → Settings → Environment Variables: `RESEND_API_KEY` present and non-empty for **Production** and **Preview**.
4. Resend dashboard: domain verified; check failed sends for domain/sender errors.
5. Optional: `cd nextjs-simonask.io && npx vercel env pull .env.vercel.production --environment production` — inspect **var names** only; delete the pulled file after.

Do **not** paste API keys into chat or commit them.

## Do / Don't

| Do | Don't |
|----|-------|
| Set the same Resend vars on Vercel Preview and Production | Commit `.env.local` or keys |
| Use `mail.simonask.io` for the sender after domain verify | Send from `@simonask.io` without verification |
| Point `CONTACT_FROM_EMAIL` at a verified address | Change `contactEmail` without checking Resend recipient limits |

## Related

- Site shell: `memories/nextjs-conventions.md`
- Deploy env names: `memories/architecture.md`
