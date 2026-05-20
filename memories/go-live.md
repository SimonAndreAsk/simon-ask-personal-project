# Go Live

Read when: the user says **Go Live** (any casing).

## Meaning

Ship the current working tree to **staging**, then **production** via `main` — same flow every time, in any chat.

## Steps (agent)

1. `git status` — confirm branch is `staging` and what will be committed.
2. Stage all intended changes (never `.env.local` or secrets).
3. Commit with a short, why-focused message (1–2 sentences).
4. `git push origin staging`
5. `git checkout main` → `git pull origin main` → `git merge staging` → `git push origin main`
6. `git checkout staging` → confirm clean working tree.
7. Tell the user both pushes succeeded and that Vercel will deploy **stage.simonask.io** and **simonask.io**.

## Do not

- Force-push `main` unless the user explicitly asks.
- Commit unless the user said Go Live (or asked for a commit explicitly).
- Skip hooks (`--no-verify`) unless the user asks.

## Related

- Detail: `.cursor/skills/git-workflow/SKILL.md`
- Branches: `memories/architecture.md`
