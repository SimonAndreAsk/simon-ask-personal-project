# Working with Cursor: rules, skills, and memories

How this repo teaches the AI — and how you can use it without `@`-ing files every time.

## The three layers

| Layer | Location | What it does |
|-------|----------|--------------|
| **Rules** | `.cursor/rules/` | Short constraints auto-attached when you edit matching folders (e.g. Next.js vs Studio) |
| **Skills** | `.cursor/skills/` | Step-by-step workflows loaded by **intent** (Go Live, grill an idea, refine a prompt, Studio schema) |
| **Memories** | `memories/` | Project conventions — deploy, GROQ, homepage cards, go-live steps, etc. |

**Router:** [memories/INDEX.md](../memories/INDEX.md) lists every memory and skill with **prompt signals** (keywords). The agent reads INDEX and loads **at most one** memory per task, unless a skill fits better.

**You usually do not `@` anything** — say what you want in normal language; the agent picks context. Use `@memories/…` or `@.cursor/skills/…` only to force a specific doc.

## Memories

- **One topic per file** — keep them short; read one file, not the whole folder.
- **Humans:** [memories/README.md](../memories/README.md) is the table of contents.
- **Agents:** [memories/INDEX.md](../memories/INDEX.md) is the routing table (workspace rule).

| Example ask | Likely memory |
|-------------|----------------|
| Deploy, staging vs prod, env names | `architecture.md` |
| Homepage card spacing | `homepage-cards.md` |
| New post field in Studio | `sanity-studio-development.md` |
| Contact form on prod | `contact-form.md` |

If nothing in INDEX matches, the agent should **stop and ask** whether to add a new memory — not guess.

## Skills

Skills are workflows with a fixed procedure. See [.cursor/README.md](../.cursor/README.md) for the list.

| Skill | Say something like… | Does *not* do by default |
|-------|---------------------|---------------------------|
| `git-workflow` | **Go Live**, commit, push, PR | — |
| `sanity-studio-develop` | add Studio field, document type, desk item | — |
| `refine-prompt` | refine my prompt, structure my ask | Run the task in the prompt |
| `grill-me` | grill this idea, stress-test my plan | Implement the idea |

Most skills point at a memory for the full playbook (e.g. `refine-prompt` → `memories/refine-prompt.md`, `grill-me` → `memories/grill-me.md`).

## Rules vs memories

| | Rules | Memories |
|---|--------|----------|
| **When loaded** | Automatically on folder match | When INDEX/skill says so |
| **Content** | Always-on constraints (minimal scope, no secrets) | Topic depth (file maps, checklists) |
| **You edit** | Rarely | When conventions change |

## Practical workflow

1. **New chat per job** — bug fix, feature slice, Go Live, big grill session (see [memories/cursor-usage.md](../memories/cursor-usage.md)).
2. **Be specific** — package + path + “done when”: e.g. `In nextjs-simonask.io/src/app/globals.css, set --color-accent to …`
3. **Decide before build** — `Grill this: …` then, if needed, `Refine my prompt for …` then a **new chat** for implementation.
4. **Ship code** — work on `staging`, say **Go Live** ([shipping.md](./shipping.md)).
5. **Publish writing** — Studio → Publish (not Git).

## Prompt template (quick)

```
[Task] What to change and where.
[Scope] nextjs-simonask.io | studio-simonask.io + path if known
[Done when] How you’ll verify
```

## Forcing context (optional)

| Force | Use when |
|-------|----------|
| `@.cursor/skills/grill-me/SKILL.md` | Devil's-advocate only |
| `@memories/homepage-cards.md` | Card layout task regardless of wording |
| `@docs/repo-map.md` | You want path aliases in context |

## Maintaining agent docs

After renames or new routes/types, update files listed in [memories/doc-sync.md](../memories/doc-sync.md), then:

```bash
node scripts/validate-agent-docs.mjs
```

## Related

- [repo-map.md](./repo-map.md) — plain names → disk paths
- [shipping.md](./shipping.md) — code vs content ship
- [AGENTS.md](../AGENTS.md) — agent entry point
