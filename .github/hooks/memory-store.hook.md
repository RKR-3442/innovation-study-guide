---
name: memory-store
description: After a task is successfully completed, automatically capture the pattern and store it in the memory MCP for future retrieval.
triggers:
  - onTaskComplete
---

After every successfully completed task, the `memory-keeper` agent stores the outcome:

## What to Capture

For every completed task, record:

1. **Title**: concise, searchable description (`JWT auth middleware pattern`)
2. **Domain**: which area of the system was affected
3. **Problem**: what was being solved
4. **Solution**: the approach that worked (concise — not a full code listing)
5. **Key insight**: the non-obvious thing that made it work
6. **Tags**: `[domain, pattern-type, success]`

## Template

```
memory-keeper store:
  Title: [concise searchable title]
  Context: [what problem was solved]
  Pattern: [approach taken — 2-5 sentences max]
  Insight: [the non-obvious part]
  Tags: [domain], pattern, success
  Date: [today's date ISO-8601]
```

## Failure Recording

If a task failed or was blocked, record that too:

```
memory-keeper store:
  Title: FAILURE — [what was attempted]
  Context: [what was being solved]
  Failure mode: [what went wrong and why]
  Lesson: [what to do differently next time]
  Tags: [domain], failure, [error-type]
  Date: [today's date ISO-8601]
```

## Retrieval on Future Tasks

Before starting any new task with a similar domain, query:
```
memory-keeper retrieve: domain=[domain] type=pattern
```

This ensures the swarm learns from past work rather than solving the same problem repeatedly.
