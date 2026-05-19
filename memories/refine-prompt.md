# Refine prompt

Read when: the user asks to **refine**, **improve**, or **structure** a prompt (or `@refine-prompt` / `/refine-prompt`).

## Your job

Take the user's rough ask and return a **refined prompt** they can paste into a new chat. Do not do the underlying task unless they also ask you to.

**Output shape:**

1. **What's missing** — one short line per missing part (Identity / Task / Context / Constraints / Output), or "none"
2. **Refined prompt** — a single copy-paste block with all relevant parts labeled in comments
3. **Optional** — one sentence on whether to chunk into follow-up prompts (only if the ask is large)

Do not lecture. Do not repeat this entire file back to the user.

---

## The five parts

A prompt is an instruction set. Use only the parts the ask needs.

| Part | Question it answers | When to skip |
|------|---------------------|--------------|
| **1. Identity** | Who is the agent right now? | Simple fix in an ongoing coding chat |
| **2. Task** | What must get done? (action + scope + detail) | Never skip |
| **3. Context** | What background is required? | Obvious from open files + project rules |
| **4. Constraints** | What must be avoided? | Quick typo/format fixes |
| **5. Output format** | What shape should the answer take? | Obvious (e.g. "fix this file") |

**Quality check for Task:** If a stranger would need five follow-up questions, the task is too vague.

**Quality check for Context:** If the output would feel generic or off-target, add context — don't rewrite Identity.

**Constraints** = the last three things that annoyed you in AI output, turned into rules.

---

## Which parts to use

| Ask type | Use |
|----------|-----|
| Simple / quick (rename, typo, one-line fix) | Task only |
| Creative (write, design, copy) | Identity + Task + Constraints + Output |
| Complex (system, multi-file feature, analysis) | All five |
| Ongoing project work | Identity + Context from project files; Task + Constraints + Output in each prompt |

**This repo:** persistent Identity + Context live in `AGENTS.md`, `.cursor/rules/`, and `memories/`. The refined prompt carries **per-task** direction (Task, Constraints, Output). Don't duplicate what's already in rules — reference paths instead.

---

## Chunking

**One prompt = one clear thing.**

If the user's ask bundles multiple deliverables, suggest steps in the "Optional" line, e.g.:

1. Schema + GROQ  
2. Next.js page + component  
3. Styling pass  

For large inputs (long docs, many files): structure first → sections in order → synthesis last. Prefer tables/structured data as-is over converting to prose.

---

## Workspace defaults (simonask.io)

When refining prompts for **this** repo, pre-fill Context and Constraints from here unless the user overrides.

### Project context (for Context section)

- **Monorepo:** `nextjs-simonask.io/` (Next.js 16, React 19, Tailwind 4) + `studio-simonask.io/` (Sanity Studio 5)
- **Content:** posts in Sanity; site reads via `sanityFetch()` in `nextjs-simonask.io/src/sanity/load.ts`
- **Ship:** code via Git (`staging` → stage.simonask.io, `main` → simonask.io); content via Sanity publish → `/api/revalidate`
- **Deep docs:** `memories/INDEX.md` → pick one of architecture / nextjs-conventions / sanity-conventions
- **Rules:** `.cursor/rules/nextjs.mdc` and `sanity-studio.mdc` apply by folder; Next 16 APIs differ from training data — use `node_modules/next/dist/docs/`

### Default identity (coding tasks in this repo)

> You are a senior full-stack developer working on simonask.io — a personal blog (Next.js + Sanity). You follow existing patterns, keep diffs minimal, and read project rules before changing conventions.

### Default constraints (coding tasks in this repo)

- Minimal scope; don't refactor unrelated code
- Match existing naming, Tailwind tokens (`globals.css`), and component patterns
- Never commit `.env`, tokens, or secrets
- Use `sanityFetch()` / `queries.ts` — don't bypass preview logic for staging drafts
- For Next.js 16: check `node_modules/next/dist/docs/` before relying on training-data APIs
- No engagement bait or filler in prose deliverables

### Pointing to files in refined prompts

Prefer concrete paths over descriptions, e.g. `nextjs-simonask.io/src/app/[slug]/page.tsx`, `studio-simonask.io/schemaTypes/postType.ts`.

---

## Template (refined prompt block)

```markdown
## Identity
[Role — or: "Use project rules + AGENTS.md"]

## Task
[Action + scope + format + enough detail to start without follow-ups]

## Context
[Audience, branch/env, relevant files, links to memories/rules — only what's not already loaded]

## Constraints
[Do / don't list]

## Output format
[Shape of the answer: code only, plan first, markdown table, etc.]
```

---

## Quick reference card

| Part | Good signal |
|------|-------------|
| Identity | Role + domain (writer, researcher, dev) |
| Task | Verb + length/scope + deliverable |
| Context | Audience, file paths, branch, prior decisions |
| Constraints | "Do not…", reading level, tools, tone |
| Output | List, table, draft with placeholders, code-only |

If the user's draft is already strong, refine lightly — don't pad for five parts.
