---
name: refactor
description: Safe, test-backed refactoring workflow. Captures behavior before changing structure, refactors incrementally, and verifies behavior is preserved.
---

You are running a **safe refactoring workflow**. The golden rule: behavior must not change.

## Step 1: Define Scope

What are we refactoring?
- [ ] Single function
- [ ] Single file/module
- [ ] Cross-module (extract shared abstraction)
- [ ] Rename (symbol, file, module)
- [ ] Architecture change (requires ADR)

## Step 2: Characterization Tests (Safety Net)

Before touching any code, capture the current behavior:

1. Ask `tester` agent to write characterization tests for all code in scope
2. These tests don't need to be clean — they just need to be passing
3. Run them: all must pass before refactoring starts
4. These are your safety net — if they fail after refactoring, something changed

## Step 3: Identify the Refactoring Type

| Type | Description | Risk |
|------|-------------|------|
| Extract function | Pull repeated logic into a named function | Low |
| Extract module | Move cohesive code to its own file | Low |
| Rename | Improve clarity of names | Low |
| Replace conditional with polymorphism | Eliminate switch/if chains | Medium |
| Extract interface | Define contract for a dependency | Medium |
| Introduce abstraction | Generalize for reuse | Medium |
| Split module | Separate concerns that grew together | High |
| Invert dependency | Restructure coupling direction | High |

## Step 4: Incremental Refactoring

**One transformation at a time.** Run tests after each step.

```
Transform 1 → Run tests (all pass?) → Commit
Transform 2 → Run tests (all pass?) → Commit
...
```

If tests fail after any step: revert that step immediately, diagnose, retry differently.

Never commit a failing test as "I'll fix it next".

## Step 5: Cleanup

After refactoring:
1. Remove the characterization tests if they tested implementation details (not behavior)
2. Keep any that actually test real behavior and convert them to proper tests
3. Delete dead code that is now unreachable
4. Update imports — no circular dependencies introduced?

## Step 6: Documentation

- Update inline comments if the *why* changed
- Update README/API docs if the public interface changed
- If architecture changed: ask `architect` agent for an ADR
- If public API changed: flag as potential breaking change for `reviewer`

## Step 7: Final Verification

1. Full test suite passes
2. No new type errors (`tsc --noEmit`)
3. No new lint warnings
4. Behavior is provably identical (characterization tests pass)

Store the refactoring pattern in memory via `memory-keeper` with tags `["refactoring", "pattern", "success"]`.
