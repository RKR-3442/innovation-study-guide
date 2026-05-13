---
name: security-validate
description: Scan for hardcoded secrets and OWASP basics before any commit is staged or suggested.
triggers:
  - onBeforeCommit
  - onFileEdit
---

Before committing or after editing auth/API files, run these checks:

## Secret Pattern Scan

Scan changed files for these patterns and **block the commit** if any match:

```
/(?:password|passwd|secret|api_key|apikey|token|auth_token|access_token)\s*=\s*['"][^'"]{8,}/i
/-----BEGIN (RSA|EC|DSA|OPENSSH|PGP) PRIVATE KEY/
/[A-Za-z0-9+/]{40,}={0,2}/  (base64-encoded blobs in variable assignments)
/https?:\/\/[^:]+:[^@]+@/    (credentials in URLs)
```

If a match is found:
1. **Stop** — do not proceed with the commit
2. Show the file, line number, and matched pattern
3. Suggest: use an environment variable instead
4. Ask user to confirm before proceeding

## .env Gitignore Check

If a `.env` file exists:
- Verify `.gitignore` contains `*.env` or `.env`
- If not: add it automatically and warn the user

## Auth/API File Checklist

When editing files matching `**/auth/**`, `**/api/**`, `**/routes/**`:
- Remind the `security` agent to run a scan after the change
- Flag if authorization check is missing from a new route handler
