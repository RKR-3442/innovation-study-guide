---
name: pr-description
description: Auto-generate a pull request title, description, and review checklist from the current diff. Follows conventional commit conventions.
---

You are generating a **pull request description** from the current diff.

## Step 1: Read the Diff

Get the changes:
```bash
git diff main...HEAD --stat
git diff main...HEAD
```

Also check for linked issues:
- Any `Closes #N`, `Fixes #N`, `Resolves #N` in commit messages?
- Any issue references in changed code?

## Step 2: Classify the Change

Determine the primary change type:
- `feat` — new feature
- `fix` — bug fix
- `refactor` — code change with no behavior change
- `test` — adding or fixing tests
- `docs` — documentation only
- `chore` — build, deps, tooling
- `perf` — performance improvement
- `security` — security fix

## Step 3: Generate Title

Format: `type(scope): concise imperative description`

Rules:
- Imperative mood: "Add user auth" not "Added" or "Adds"
- Scope is the module/feature affected: `(auth)`, `(api)`, `(checkout)`
- Max 72 characters
- No trailing period

Example: `feat(auth): add JWT refresh token rotation`

## Step 4: Generate Description

```markdown
## What

[1-3 sentences describing what this PR does. Focus on the observable change,
not the implementation details.]

## Why

[Why was this change needed? What problem does it solve? Link to issue if applicable.]

Closes #[issue number if applicable]

## How

[Brief explanation of the approach taken. Only include if the implementation
is non-obvious.]

## Testing

[How was this tested? What test cases were added?]

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manually tested (describe how)

## Screenshots / Demo

[If UI change, include before/after screenshots. Otherwise delete this section.]

## Breaking Changes

[List any breaking changes. If none, write "None."]

## Checklist

- [ ] Code follows project conventions
- [ ] Tests pass (`npm test` / `pytest` / etc.)
- [ ] No hardcoded secrets
- [ ] Documentation updated
- [ ] ADR written if architecture changed
```

## Step 5: Risk Assessment

Append a brief risk note based on the diff:
- Files changed: N
- Blast radius: [narrow / moderate / wide]
- Recommended reviewers: [based on file ownership — check `git log --follow` for frequent authors]
