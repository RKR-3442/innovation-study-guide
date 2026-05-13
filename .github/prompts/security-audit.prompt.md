---
name: security-audit
description: Run a comprehensive OWASP Top 10 security audit, check for hardcoded secrets, scan dependencies for CVEs, and detect prompt injection risks.
---

You are running a **full security audit**. Delegate to the `security` agent.

## Audit Scope

Confirm scope before starting:
- [ ] Full codebase
- [ ] Specific changed files (diff-based)
- [ ] Auth/API layer only
- [ ] Dependency scan only

---

## Step 1: Secret Detection

Scan the entire codebase for hardcoded secrets:

Patterns to find:
- Variables named `password`, `secret`, `key`, `token`, `api_key` with string assignments
- Connection strings with credentials embedded
- `.env` files tracked in git (check `.gitignore`)
- Private keys (PEM headers: `-----BEGIN`)
- Bearer tokens or JWTs hardcoded in source

**Severity: CRITICAL** for any finding. Fix immediately.

---

## Step 2: OWASP Top 10 Scan

The `security` agent will check all 10 categories. Focus areas:

**A01 — Broken Access Control**
- Every route/endpoint has authorization check?
- Object-level authorization (can user A access user B's data)?
- Directory traversal possible?

**A02 — Cryptographic Failures**
- Passwords hashed with bcrypt/argon2 (not MD5/SHA1)?
- PII encrypted at rest?
- HTTPS enforced? HTTP Strict Transport Security header set?

**A03 — Injection**
- All DB queries parameterized (no string concatenation)?
- Shell commands constructed from user input?
- XML/JSON/HTML parsed from untrusted input safely?

**A07 — Auth & Session Failures**
- Sessions invalidated on logout?
- JWT expiry enforced?
- Brute-force protection on login?
- Secure + HttpOnly + SameSite flags on cookies?

---

## Step 3: Dependency CVE Scan

Run dependency audit:
- Node: `npm audit --json` or `pnpm audit`
- Python: `pip-audit` or `safety check`
- Rust: `cargo audit`

Report: package → CVE ID → CVSS score → fixed version → upgrade command.

---

## Step 4: Prompt Injection Scan (if AI code present)

If the codebase contains LLM API calls:
- Is user input inserted directly into system prompts?
- Are prompt boundaries clearly delimited?
- Is LLM output sanitized before rendering or executing?

---

## Step 5: Report & Remediation Plan

Output:
1. Severity-sorted findings (Critical → High → Medium → Low)
2. For each finding: file + line, description, remediation
3. Estimated effort to fix each
4. Prioritized fix order

Ask `memory-keeper` to store the audit summary with tags `["security", "audit", "success"]`.
