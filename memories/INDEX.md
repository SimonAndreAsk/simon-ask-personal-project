# Memory index

Project-specific context for agents. **Do not read every file** — pick at most 1–2 for the current task.

| File | Read when |
|------|-----------|
| [architecture.md](./architecture.md) | Deploy, env vars, staging vs production, draft preview, webhooks |
| [nextjs-conventions.md](./nextjs-conventions.md) | Pages, components, styling, theme, Sanity fetch on the site |
| [sanity-conventions.md](./sanity-conventions.md) | Schema, Studio, GROQ, Presentation, publishing |
| [sanity-studio-development.md](./sanity-studio-development.md) | New types, fields, desk, plugins, Presentation in Studio |
| [decisions.md](./decisions.md) | Why something was built a certain way |
| [refine-prompt.md](./refine-prompt.md) | User wants a prompt refined (Identity, Task, Context, Constraints, Output) |
| [doc-sync.md](./doc-sync.md) | What agent docs to update when code structure changes |

## Not duplicated here

- Setup commands and env tables → root `README.md`, `nextjs-simonask.io/README.md`, `studio-simonask.io/README.md`
- Next.js 16 breaking changes → `.cursor/rules/nextjs.mdc` (auto when editing `nextjs-simonask.io/`)
