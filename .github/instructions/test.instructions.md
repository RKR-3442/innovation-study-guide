---
applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx,py},**/tests/**,**/test/**,**/__tests__/**"
---

# Test Standards

## File Organization

- Co-locate tests with source: `foo.ts` → `foo.test.ts` in the same directory
- One `describe` block per module at the top level
- Nest `describe` blocks for method/function groups
- Name test files exactly like source files plus `.test.` or `.spec.`

## Test Structure

Every test must follow **Arrange-Act-Assert**:

```typescript
it('returns null when user is not found', () => {
  // Arrange
  const repo = new MockUserRepo({ users: [] })
  const service = new UserService(repo)

  // Act
  const result = service.getUserById('nonexistent-id')

  // Assert
  expect(result).toBeNull()
})
```

## Coverage Requirements

Every new public function must have tests for:
- ✓ Happy path (valid input → expected output)
- ✓ Empty / null / undefined inputs
- ✓ Boundary values (0, -1, empty array, max length)
- ✓ Error conditions (invalid input, upstream failure)
- ✓ Async: resolved promise, rejected promise, timeout

## Naming Convention

```
it('[subject] [action] when [condition]')
it('getUserById returns null when user does not exist')
it('validateEmail throws when email is malformed')
it('checkout completes when cart has items and payment succeeds')
```

## Mocking Rules

- Mock at the boundary: mock external services, databases, APIs — not internal helpers
- Never mock the thing being tested
- Use `jest.spyOn` / `unittest.mock.patch` to assert on calls — not just returns
- Clean up mocks after each test (`afterEach(() => jest.clearAllMocks())`)

## Anti-Patterns to Avoid

- No `expect(fn).not.toThrow()` as the only assertion — too weak
- No snapshot tests for logic — only for UI rendering
- No `setTimeout` / `sleep` in tests — use fake timers
- No tests that depend on execution order — each test must be independent
- No magic numbers — name your test values (`const VALID_EMAIL = 'test@example.com'`)
