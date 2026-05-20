---
name: git-workflow
description: >-
  Git commit and GitHub PR workflow for simonask.io. Use when the user asks to
  commit, amend, push, create a pull request, or says Go Live.
---

# Git workflow (simonask.io)

Apply when the user explicitly asks for a commit, PR, or **Go Live**.

## Go Live

When the user says **Go Live** or **Go Live and Deploy Sanity**, follow **`memories/go-live.md` only** (do not duplicate its step list here). For combined ship, use the “Go Live and Deploy Sanity” section there first, then the git steps.

## Commits

1. In parallel: `git status`, `git diff` (staged + unstaged), `git log` (recent messages).
2. Draft a 1–2 sentence message focused on **why**. Do not commit `.env` or secrets.
3. Stage relevant files, commit with HEREDOC message, then `git status`.
4. Never `git config` changes. No `--no-verify` unless user asks. No force-push to `main`/`master`.
5. No `git commit --amend` unless: user asked amend, HEAD commit is yours this session, and branch is not pushed.
6. If a hook rejects the commit, fix and make a **new** commit (never amend a failed commit).
7. Do not push unless the user asks.

Commit message example:

```bash
git commit -m "$(cat <<'EOF'
Short why-focused summary.

EOF
)"
```

## Pull requests

Use `gh` for all GitHub tasks.

1. In parallel: `git status`, `git diff`, branch tracking vs remote, `git log` and `git diff [base]...HEAD`.
2. Summarize **all** commits on the branch, not only the latest.
3. Push with `-u` if needed, then `gh pr create` with HEREDOC body.
4. Return the PR URL. Do not use interactive git (`-i`).

PR body template:

```bash
gh pr create --title "title" --body "$(cat <<'EOF'
## Summary
- …

## Test plan
- [ ] …

EOF
)"
```
