---
name: testgen
description: Find test gaps across the codebase and generate comprehensive test suites for all untested or undertested code.
---

You are running a **test gap analysis and generation** workflow. Delegate all work to the `tester` agent.

## Step 1: Scope Definition

Clarify scope — pick one:
- [ ] Specific file(s): `[path]`
- [ ] Changed files since last commit (`git diff HEAD`)
- [ ] Entire module/directory: `[path]`
- [ ] All files with < N% coverage

## Step 2: Gap Analysis

For the scoped files, the `tester` agent will:

1. List every public function/method/class
2. Check for a corresponding `*.test.*` or `*.spec.*` file
3. For files with existing tests: check coverage of happy path, edge cases, error conditions
4. Produce a gap table:

| File | Function | Has Test? | Missing Cases |
|------|----------|-----------|---------------|
| `foo.ts` | `getUserById` | Partial | null id, DB timeout |
| `bar.ts` | `validateEmail` | No | all |

## Step 3: Prioritization

Rank gaps by risk:
- **Critical**: auth, payment, data-mutation functions with no tests
- **High**: public API endpoints with no error-case tests
- **Medium**: utility functions with no edge-case tests
- **Low**: pure formatting/display functions

## Step 4: Generation

Generate tests for Critical + High gaps first, then Medium. For each:
- One `describe` block per module
- One `it` per case (happy path, each edge case, each error case)
- Real assertions — not just `expect(fn).not.toThrow()`
- Proper mocking at boundaries

## Step 5: Verification

Run the full test suite after generation:
- All new tests must pass
- No existing tests broken
- Report final coverage delta

## Output

1. Gap analysis table
2. All generated test files
3. Test run summary: N new tests added, N passed, coverage change
