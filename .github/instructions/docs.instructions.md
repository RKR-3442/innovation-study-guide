---
applyTo: "**/docs/**,**/*.md,**/README*,**/CHANGELOG*"
---

# Documentation Standards

## Writing Principles

- **Audience-first**: write for a reader who has never seen this codebase
- **Present tense**: "Returns the user" not "Will return" or "Returned"
- **Active voice**: "Validates the input" not "The input is validated"
- **One idea per sentence**: long compound sentences lose readers
- **Code examples**: always include one, always verify it mentally for correctness

## README Structure

Every module/package README must have these sections in order:

```markdown
# [Name]
[One-sentence description of what this does]

## Prerequisites
[Runtime versions, env vars required before running]

## Installation
[Exact commands to install]

## Quick Start
[Minimal working example — copy-paste and it runs]

## Configuration
[All config options with types, defaults, and descriptions]

## API Reference
[Or link to generated docs]

## Contributing
[How to run tests, linting, submit PRs]

## License
```

## API Documentation

For every public function/class:

```typescript
/**
 * Retrieves a user by their unique identifier.
 *
 * @param id - The user's UUID
 * @returns The user object, or null if not found
 * @throws {DatabaseError} If the database connection fails
 *
 * @example
 * const user = await getUserById('550e8400-e29b-41d4-a716-446655440000')
 * if (user) console.log(user.name)
 */
```

## ADR Format

ADRs live at `docs/adr/ADR-NNN-short-title.md`. Required sections:
- Status (Proposed | Accepted | Deprecated | Superseded by ADR-XXX)
- Context
- Decision
- Consequences (Positive / Negative / Neutral)
- Alternatives Considered

## Changelog Format

Follow [Keep a Changelog](https://keepachangelog.com):
```markdown
## [version] - YYYY-MM-DD
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
```

## Cross-References

Reference ADRs in code where the decision is implemented:
```typescript
// See ADR-007: Using optimistic locking to avoid deadlocks under load
```

Reference GitHub issues for TODOs:
```typescript
// TODO(#123): Replace with streaming API once #123 is resolved
```
