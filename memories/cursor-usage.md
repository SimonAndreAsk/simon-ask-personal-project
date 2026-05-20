# Cursor token usage — prompting workflow

Read when: you want a repeatable way to work with the agent without burning context.

## 1. New chat when…

Start a **new chat** for each discrete job:

| Situation | Example first message |
|-----------|------------------------|
| One bug or UI tweak | `Change globals.css --accent to #…` |
| One feature slice | `Add optional subtitle field to post schema in studio-simonask.io` |
| Git / PR | `Commit staged changes with message …` / `Open PR to main` |
| Ship to prod | **`Go Live`** — commit, push `staging`, merge to `main` (see `go-live.md`) |
| Doc/structure change | `Renamed src/app/blog to posts — update agent docs` |

**Stay in the same chat** only while iterating on the *same* file/PR.

You do **not** need to `@` memories or skills — the agent reads `memories/INDEX.md` and picks context (see workspace rule).

## 2. What you write (no @ required)

| You provide | Agent does |
|-------------|------------|
| Task + file path or package | Works from path; may skip extra memory for trivial edits |
| Task + domain words (deploy, schema, GROQ, commit…) | Reads `memories/INDEX.md`, loads **one** memory or skill |
| Vague / whole-repo ask | Agent reads INDEX; if nothing fits, **stops and asks** whether to add a new memory |
| No INDEX match | Agent proposes a new file under memories/ — you choose: create it, proceed without, or clarify |

Optional: `@memories/…` or `@.cursor/skills/…` only to **override** routing (force a specific doc).

## 3. Prompt template

```
[Task] One sentence: what to change and where.
[Scope] nextjs-simonask.io | studio-simonask.io + path if you know it
[Done when] How you’ll verify
```

**Good:** `In nextjs-simonask.io/src/app/globals.css, set --color-accent to oklch(0.7 0.15 250). Done when hero CTA uses it.`

**Bad:** `Review my workspace and suggest improvements.`

## 4. Before you close a structural task

```bash
node scripts/validate-agent-docs.mjs
```

Stop hook is off (`.cursor/hooks.json`) to save tokens.

## 5. Cursor settings (you)

Prefer **short User Rules** in Cursor Settings → Rules. Move git/PR detail to the project skill (`@.cursor/skills/git-workflow`) — already in the repo.

Example minimal User Rules:

```markdown
- Run commands and investigate; don't give up after one failure.
- Minimize diff scope; match existing code style; no drive-by refactors.
- Code citations: ```startLine:endLine:path``` on its own line; no HTML entities in fences.
- Commits/PRs: only when I ask; agent uses git-workflow skill when asked.
- simonask.io: agent routes via memories/INDEX.md (one memory max); I don't @ files unless overriding.
```

You can delete from global User Rules anything duplicated in `memories/doc-sync.md`, `workspace.mdc`, or `.cursor/skills/git-workflow/`.

- Turn off *Include third-party Plugins, Skills, and other configs* if unused
