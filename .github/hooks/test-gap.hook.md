---
name: test-gap
description: After any source code change, check if a corresponding test file exists. Flag missing tests and optionally trigger the tester agent.
triggers:
  - onFileEdit
---

After any source file is edited, check for test coverage:

## Test File Detection

For every edited source file at `src/path/to/foo.ts`:
1. Look for `src/path/to/foo.test.ts`
2. Look for `src/path/to/foo.spec.ts`
3. Look for `tests/path/to/foo.test.ts`
4. Look for `__tests__/path/to/foo.test.ts`

## Response Logic

**If no test file found:**
```
⚠ No test file found for [filename]
Expected: [filename].test.[ext]
Run /testgen to generate tests, or confirm this file is intentionally untested.
```

**If test file exists but is significantly smaller than source (< 30% line count ratio):**
```
ℹ Test file may have gaps for [filename]
Source: N lines | Tests: M lines
Consider running /testgen to check coverage.
```

**If test file exists and ratio looks healthy:**
- No message — do not interrupt the workflow

## Skip List

Do not flag missing tests for:
- `*.config.{ts,js}` — configuration files
- `*.d.ts` — type declaration files
- `**/index.{ts,js}` — barrel/re-export files with no logic
- `**/migrations/**` — database migrations (they have their own verification)
- `**/types/**` — pure type files
