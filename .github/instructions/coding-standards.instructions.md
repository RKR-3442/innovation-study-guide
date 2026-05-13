---
applyTo: "**/*.{ts,tsx,js,jsx,mjs,cjs,py,rs}"
---

# Coding Standards

## TypeScript / JavaScript

- `strict: true` in tsconfig — no exceptions
- No `any` — if you must use it, add a comment: `// eslint-disable-next-line @typescript-eslint/no-explicit-any — reason`
- Prefer `const` over `let`; never use `var`
- `async/await` always — never raw `.then()/.catch()` chains
- Explicit return types on all public functions
- Destructure objects at function parameters where ≥3 properties are used
- Named exports preferred over default exports (better refactoring support)
- No barrel files (`index.ts` re-exporting everything) in deeply nested modules

## Python

- Type hints on all function signatures (PEP 484)
- Docstrings: Google style for public functions
- `dataclasses` or `pydantic` for data containers — no plain dicts as function return values
- `pathlib.Path` not `os.path`
- f-strings not `.format()` or `%`

## Rust

- `clippy` must pass with no warnings
- `unwrap()` only in tests — use `?` or explicit error handling in production code
- Derive `Debug` on all public structs

## Universal Rules

- Functions: single responsibility, max ~50 lines — split if larger
- Naming: descriptive, intention-revealing (`getUserById` not `getUser` or `g`)
- Comments: explain *why*, never *what*
- No dead code: remove unused imports, variables, functions before committing
- No magic numbers: name your constants (`const MAX_RETRY_COUNT = 3`)
- No TODO without issue reference: `// TODO(#123): description`
- Conventional commits: `type(scope): description`
