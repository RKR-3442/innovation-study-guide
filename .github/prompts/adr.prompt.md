---
name: adr
description: Create a new Architecture Decision Record (ADR) for a significant design decision. Scans existing ADRs to assign the next sequential number.
---

You are creating a new **Architecture Decision Record**. Follow this protocol exactly.

## Step 1: Discover Next ADR Number

Scan `docs/adr/` for existing ADR files. Find the highest number (e.g., `ADR-007-*`) and use the next one. If the directory doesn't exist, create it and start at `ADR-001`.

## Step 2: Gather Context

Ask (or infer from the conversation):
1. What decision needs to be recorded?
2. What was the context / problem forcing this decision?
3. What alternatives were considered?
4. Why were they rejected?
5. What are the trade-offs of the chosen approach?

## Step 3: Write the ADR

Create the file at `docs/adr/ADR-NNN-short-kebab-title.md` with this exact structure:

```markdown
# ADR-NNN: [Title in Title Case]

## Status

Accepted

## Date

YYYY-MM-DD

## Context

[What is the problem? What forces are at play? What constraints exist?
Be specific — a future reader should understand WHY this decision was needed
without any prior context.]

## Decision

[What did we decide? State it clearly and directly.
"We will use X because Y."]

## Consequences

### Positive
- [benefit 1]
- [benefit 2]

### Negative
- [trade-off 1]
- [trade-off 2]

### Neutral
- [side effect that is neither good nor bad]

## Alternatives Considered

### [Alternative 1 Name]
[Description and why it was rejected]

### [Alternative 2 Name]
[Description and why it was rejected]

## References

- [link or document that informed this decision]
```

## Step 4: Cross-Reference

Identify source files where this decision is implemented and add a comment:
```typescript
// See ADR-NNN: [short reason this code relates to the ADR]
```

## Step 5: Store in Memory

Ask `memory-keeper` to store: `ADR-NNN created: [one-sentence summary]` with tags `["architecture", "decision", "success"]`.
