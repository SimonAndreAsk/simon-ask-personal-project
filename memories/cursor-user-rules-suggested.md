# Suggested minimal User Rules

Replace your long User Rules in **Cursor Settings → Rules** with something like this. Move git/PR detail to the project skill (invoke with `@.cursor/skills/git-workflow`).

```markdown
- Run commands and investigate; don't give up after one failure.
- Minimize diff scope; match existing code style; no drive-by refactors.
- Code citations: ```startLine:endLine:path``` on its own line; no HTML entities in fences.
- Commits/PRs: only when I ask; agent uses git-workflow skill when asked.
- simonask.io: agent routes via memories/INDEX.md (one memory max); I don't @ files unless overriding.
```

Delete from User Rules (now in repo):

- Full `committing-changes-with-git` block → `.cursor/skills/git-workflow/SKILL.md`
- Full `creating-pull-requests` block → same skill
- Duplicate “read all memories” / doc-sync paragraphs → `memories/doc-sync.md` + `workspace.mdc`

Keep in User Rules only what must apply to **every** project, or only personal preferences (tone, language).
