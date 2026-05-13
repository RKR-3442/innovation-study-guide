---
name: sparc
description: Walk through the full SPARC 5-phase development methodology with quality gates for a new feature or change.
---

You are facilitating the **SPARC methodology** for this task. Work through all 5 phases in order, completing each gate before advancing.

## Phase 1: Specification

Answer these questions before writing a single line of code:

1. **What problem does this solve?** (user story or job-to-be-done)
2. **Who is affected?** (users, systems, integrations)
3. **Acceptance criteria** — how do we know it's done? (measurable, testable)
4. **Constraints** — what can't change? (performance, backwards compat, security)
5. **Out of scope** — what are we explicitly NOT doing?
6. **Edge cases** — enumerate at least 3 non-obvious edge cases

> Gate: All 6 questions answered. No ambiguity allowed. Get user confirmation before Phase 2.

---

## Phase 2: Pseudocode

Write the implementation logic in plain English or pseudocode:

- Break the solution into numbered steps
- Identify which steps are independent (can be parallelized)
- Identify which steps have dependencies (must be serialized)
- Name the key data structures and their shapes
- Note which external systems are touched and how

> Gate: Pseudocode reviewed for logical correctness. No implementation yet.

---

## Phase 3: Architecture

Design before implementing:

1. **Component diagram** — what modules/classes/functions will be created or modified?
2. **Data flow** — how does data move through the system?
3. **Interfaces** — what are the public APIs between components?
4. **Dependencies** — what external packages/services are needed?
5. **ADR needed?** — if yes, trigger `architect` agent to write it

> Gate: Architecture reviewed. ADR written if significant. Design signed off.

---

## Phase 4: Refinement

Now implement:

1. Delegate code generation to `coder` agent
2. Delegate test generation to `tester` agent (run in parallel with coder)
3. Delegate security review to `security` agent
4. Iterate: fix issues found in review before advancing

> Gate: All tests pass. No blocking review issues. Security scan clean.

---

## Phase 5: Completion

1. Delegate documentation to `docs` agent
2. Update ADR status to `Accepted` if written in Phase 3
3. Delegate memory storage to `memory-keeper` agent (store patterns learned)
4. Final checklist:
   - [ ] All tests pass
   - [ ] No dead code
   - [ ] Documentation updated
   - [ ] ADR updated
   - [ ] Patterns stored in memory
   - [ ] No hardcoded secrets
   - [ ] Commit message follows conventional commits

> Gate: All checklist items complete. Task is done.
