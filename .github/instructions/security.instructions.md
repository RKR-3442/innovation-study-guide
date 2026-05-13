---
applyTo: "**/auth/**,**/api/**,**/middleware/**,**/*.env*,**/routes/**,**/controllers/**,**/handlers/**"
---

# Security Rules

These rules apply to all authentication, API, and data-boundary code. No exceptions.

## Secrets & Credentials

- **Never** hardcode API keys, tokens, passwords, or connection strings in source files
- Use environment variables: `process.env.SECRET_NAME` / `os.environ["SECRET_NAME"]`
- `.env` files must be in `.gitignore` — never committed
- Rotate any credential that may have been accidentally committed

## Input Validation

- Validate ALL user input at the system boundary before processing
- Use a schema validation library (Zod, Joi, Pydantic, serde) — no manual parsing
- Reject unexpected fields — don't pass raw request bodies to database operations
- Validate types, lengths, formats, and ranges explicitly

## Authentication

- Session tokens must be: cryptographically random, ≥128 bits, stored server-side
- JWT: verify signature AND expiry on every request
- JWT: use `RS256` or `ES256` — never `none` or `HS256` with a weak secret
- Passwords: hash with `bcrypt` (cost ≥12) or `argon2id` — never MD5/SHA1/SHA256
- Implement rate limiting on all auth endpoints (login, register, password reset)
- Invalidate sessions on logout — don't just delete the client cookie

## Authorization

- Check authorization on EVERY route, not just authenticated ones
- Object-level authorization: verify the requesting user owns/can access the specific resource
- Never trust the client for the user's role or permissions — always resolve server-side
- Principle of least privilege: grant minimum permissions needed

## API Security

- Set security headers: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `HSTS`
- CORS: explicit allowlist, never `*` in production
- Rate limit all public endpoints
- Return generic error messages to clients — detailed errors go to logs only

## Logging

Always log (structured JSON):
- `auth.login_attempt` — include success/failure, IP, user agent
- `auth.logout`
- `permission.denied` — include resource and user
- `admin.action` — full audit trail

Never log: passwords, tokens, full credit card numbers, SSNs, health data.

## Prompt Injection (AI code)

- Never concatenate user input directly into LLM system prompts
- Delimit user content clearly from system instructions
- Sanitize LLM output before rendering in HTML or executing as code
