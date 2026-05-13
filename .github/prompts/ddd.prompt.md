---
name: ddd
description: Scaffold a new domain using Domain-Driven Design. Generates bounded contexts, aggregates, domain events, repositories, and application services with correct structure.
---

You are scaffolding a **Domain-Driven Design** bounded context. Delegate architecture decisions to the `architect` agent and code generation to the `coder` agent.

## Step 1: Domain Discovery

Answer these questions first:
1. What is the name of the bounded context? (`OrderManagement`, `UserIdentity`, etc.)
2. What are the core business concepts (nouns)? These become aggregates or entities.
3. What are the core business actions (verbs)? These become domain commands.
4. What state changes do we need to communicate to other contexts? These become domain events.
5. What are the invariants — rules that must always be true?

## Step 2: Context Map

Define how this bounded context relates to others:
- **Upstream** contexts (this context consumes their data)
- **Downstream** contexts (they consume this context's data or events)
- Integration pattern: Shared Kernel / Customer-Supplier / Anti-Corruption Layer / Open Host

## Step 3: Aggregate Design

For each aggregate:
- **Root entity**: the one you always load by ID
- **Invariants**: rules enforced within the aggregate boundary
- **Lifecycle**: how is it created, updated, deleted?
- **Events emitted**: what domain events does it raise?

## Step 4: Generate File Structure

```
src/
  [context-name]/
    domain/
      [AggregateRoot].ts         # aggregate root entity
      [AggregateRoot].events.ts  # domain events (past tense)
      [AggregateRoot].repo.ts    # repository interface (not implementation)
      value-objects/
        [ValueObject].ts
    application/
      [UseCase]Handler.ts        # orchestrates domain; no business logic here
      [UseCase]Command.ts        # input DTO
      [UseCase]Result.ts         # output DTO
    infrastructure/
      [AggregateRoot].db-repo.ts # repository implementation
    index.ts                     # public API of the bounded context
```

## Step 5: Generate Stubs

The `coder` agent will generate stubs for all files with:
- Correct TypeScript types and interfaces
- Aggregate root extending a base `AggregateRoot` class with event tracking
- Repository interface with `findById`, `save`, `delete`
- Domain events as immutable value objects with `occurredAt` timestamp
- Application service that validates input, loads aggregate, calls domain method, saves, publishes events

## Step 6: Write ADR

Ask `architect` agent to write an ADR documenting the context's boundaries and key design decisions.

## Step 7: Generate Tests

Ask `tester` agent to generate tests for all aggregate invariants and application service happy paths.
