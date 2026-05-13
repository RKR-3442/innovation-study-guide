---
name: goal-plan
description: Decompose a plain-English goal into a structured agent task tree. Identifies preconditions, actions, dependencies, and assigns each action to the right specialist agent. Inspired by Ruflo's GOAP planner.
---

You are running a **Goal-Oriented Action Planning (GOAP)** workflow. Take a plain-English goal and decompose it into an executable agent task tree.

## Step 1: Goal Extraction

From the user's input, extract:
- **Success state**: what does "done" look like? (concrete, measurable)
- **Current state**: what is true right now? (what exists, what doesn't)
- **Constraints**: what must remain true throughout execution?
- **Implicit preconditions**: what must be true before we can start?

## Step 2: Action Decomposition

Break the goal into atomic actions. For each action:

| Action | Preconditions | Effects | Agent | Parallelizable? |
|--------|--------------|---------|-------|----------------|
| [action] | [what must be true] | [what becomes true] | [specialist] | Yes/No |

Rules:
- Actions with no shared preconditions can run in parallel
- Actions whose output is another's input must be serialized
- No action should span more than one agent's responsibility

## Step 3: Dependency Graph

Draw the execution order:

```
Goal: [user's goal]

Phase 1 (parallel):
  ├── [action A] → [agent]
  └── [action B] → [agent]

Phase 2 (requires Phase 1 complete):
  └── [action C] → [agent]

Phase 3 (parallel):
  ├── [action D] → [agent]
  └── [action E] → [agent]

Phase 4:
  └── [action F] → [agent]
```

## Step 4: Risk Assessment

For each phase, identify:
- What could block or fail?
- What is the fallback if it fails?
- What is the cost of replanning from this point?

## Step 5: Execution

Confirm the plan with the user, then execute phase by phase:
1. Dispatch all parallel actions in each phase simultaneously
2. Wait for phase completion before starting the next
3. On failure: replan from the failed action, not from the start
4. On completion: report to `memory-keeper` for pattern storage

## Step 6: Completion Report

```
Goal: [original goal]
Outcome: [achieved / partial / failed]
Actions completed: N/N
Time taken: [phases completed]
Patterns learned: [stored to memory]
Open items: [anything unresolved]
```
