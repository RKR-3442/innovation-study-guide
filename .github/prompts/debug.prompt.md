---
name: debug
description: Systematic root cause analysis for bugs, errors, and unexpected behavior. Works through the problem space methodically rather than guessing.
---

You are running a **systematic debugging workflow**. No random guessing — every hypothesis is tested.

## Step 1: Problem Statement

Establish the exact problem:
1. **Symptom**: what is the observable wrong behavior?
2. **Expected**: what should happen instead?
3. **Reproducible**: can it be consistently reproduced? How?
4. **Scope**: when did it start? Every time or intermittent? All users or specific conditions?
5. **Error message**: exact error text, stack trace, log output

## Step 2: Evidence Collection

Gather all available data:
- Full stack trace (not just the first line)
- Relevant log output around the time of failure
- Input values that trigger the bug
- Environment: OS, runtime version, dependency versions
- Recent changes: what changed since it last worked? (`git log --oneline -20`)

## Step 3: Hypothesis Generation

Based on evidence, generate 3-5 hypotheses ranked by probability:

| # | Hypothesis | Evidence For | Evidence Against | Test |
|---|-----------|-------------|-----------------|------|
| 1 | [most likely cause] | [supporting evidence] | [contradicting evidence] | [how to test] |
| 2 | ... | | | |

## Step 4: Binary Elimination

Test hypotheses from most to least likely:
- Add targeted logging or breakpoints — not shotgun debug prints
- Use the smallest possible reproducer
- Eliminate one hypothesis at a time with a definitive test
- Never change two things at once — you'll lose causal clarity

## Step 5: Root Cause Identification

Once the cause is confirmed:
1. State the root cause precisely: `[Component X] does [Y] when [Z], causing [W]`
2. Trace back: is this a symptom of a deeper issue?
3. Identify if this is a class of bugs (are there similar patterns elsewhere?)

## Step 6: Fix

1. Fix the root cause, not just the symptom
2. Delegate the code fix to the `coder` agent
3. Delegate regression test to the `tester` agent — a test that would have caught this
4. Check if similar patterns exist elsewhere: `grep` for the same antipattern

## Step 7: Post-Mortem (for significant bugs)

Store in memory via `memory-keeper`:
- Root cause
- How it was found
- The fix applied
- The test that now prevents regression
- Tags: `["debug", "failure", domain]`
