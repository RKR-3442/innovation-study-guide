---
name: code-review
description: Perform a thorough code review with risk scoring, change impact analysis, and actionable feedback. Works on staged changes, a PR, or specified files.
---

You are running a **structured code review**. Delegate to the `reviewer` agent.

## Step 1: Identify the Diff

Determine what to review — pick one:
- [ ] Active pull request (use GitHub MCP)
- [ ] Staged changes (`git diff --cached`)
- [ ] Changes since branch point (`git diff main...HEAD`)
- [ ] Specific files: `[paths]`

## Step 2: Intent Clarification

Before reviewing, understand the intent:
- What was this change supposed to do?
- Is there a linked issue or ticket?
- Are there any known trade-offs the author made consciously?

## Step 3: Four-Dimension Review

The `reviewer` agent will evaluate:

### Correctness
- Logic errors, off-by-one, missed edge cases
- Async/await correctness, race conditions
- Null/undefined handling

### Maintainability
- Readability, naming, single responsibility
- Code duplication, appropriate abstraction
- Complexity (cyclomatic complexity > 10 is a flag)

### Security
- Hardcoded secrets, injection risks, auth gaps
- (Escalate to `security` agent if HIGH findings)

### Test Coverage
- New code has tests?
- Tests cover edge cases?
- Tests would catch a regression?

## Step 4: Change Impact Analysis

For each changed file:
1. Who calls this code? (find all usages)
2. Is this a public API? (breaking change?)
3. Is shared state mutated? (side effects?)
4. Are there downstream consumers that need updating?

## Step 5: Risk Score

Assign overall risk:
- **LOW**: routine, well-tested, narrow blast radius → approve
- **MEDIUM**: concerns present, needs fixes → request changes
- **HIGH**: critical path, poor test coverage, or security issues → block
- **CRITICAL**: active vulnerability or data-loss risk → block + alert

## Step 6: Output

Structured review report:
```
## Risk Score: [LOW | MEDIUM | HIGH | CRITICAL]
## Summary
## Blocking Issues (must fix)
## Non-Blocking Suggestions
## Change Impact
## Test Coverage Assessment
## Recommended Reviewers (based on file ownership)
```
