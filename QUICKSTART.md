# Ruflo for VS Code — Quickstart Guide

You now have a full multi-agent AI system running inside GitHub Copilot. Think of it as a team of 10 specialized AI experts — each with a defined role — that work together on your code.

---

## What Is This?

When you chat with GitHub Copilot normally, you're talking to one generic AI. With Ruflo, you have **10 specialist agents** you can direct, plus automatic tools like persistent memory (the AI remembers things across sessions), direct file access, GitHub integration, and browser control.

**Before you start:** Make sure your MCP servers are running.
1. Press `Ctrl+Shift+P`
2. Type **MCP: List Servers** and press Enter
3. Click **Start** on any server that isn't running
4. Click **Trust** when asked

> **Troubleshooting a server that won't start?** See the Troubleshooting section at the bottom.

---

## Step 1: Open the Chat

Press `Ctrl+Alt+I` to open the Copilot Chat panel.

Make sure you're in **Agent mode** — look for the mode selector at the bottom of the chat input. If it says "Ask" or "Edit", click it and switch to **Agent**.

---

## Step 2: Pick an Agent

Type `@agent-name` in the chat to call a specialist directly.

**Not sure which agent to use? Start with `@swarm-orchestrator`** — it reads your request and automatically calls the right specialists in parallel, then combines their results.

| What you want to do | Agent to use |
|---|---|
| A big task (code + tests + docs + security review) | `@swarm-orchestrator` |
| Run a task fully hands-off, start to finish | `@autopilot` |
| Write or edit code | `@coder` |
| Find and write missing tests | `@tester` |
| Review code for bugs and quality | `@reviewer` |
| Check for security vulnerabilities | `@security` |
| Design a system or document a decision | `@architect` |
| Write or update documentation | `@docs` |
| Set up logging, CI/CD, or database migrations | `@devops` |
| Store or recall something the AI learned | `@memory-keeper` |

---

## Step 3: Example Tasks (Copy & Paste These)

---

### Build a feature from scratch
**Agent:** `@swarm-orchestrator`

```
Build a user registration endpoint in TypeScript. It should accept email and password,
validate the input, hash the password with bcrypt, save to a database, and return a JWT.
Include unit tests and run a security check on the result.
```

> The orchestrator sends this to `@coder`, `@tester`, and `@security` **simultaneously**, then combines all three responses into one.

---

### Scan your code for security vulnerabilities
**Agent:** `@security` — or type `/security-audit`

```
Scan this entire project for hardcoded secrets, SQL injection risks, and OWASP Top 10 issues.
Give me a prioritized list of what to fix first.
```

---

### Review code before committing
**Agent:** `@reviewer` — or type `/code-review`

```
Review my recent changes. Score the overall risk level (LOW / MEDIUM / HIGH / CRITICAL)
and list any bugs, code smells, or things that would fail a senior dev review.
```

---

### Generate tests for untested code
**Agent:** `@tester` — or type `/testgen`

```
Find all functions in this project that don't have tests and generate them.
Cover happy path, edge cases, and error conditions for each.
```

---

### Document a design decision
**Agent:** `@architect` — or type `/adr`

```
I just decided to use Redis for session storage instead of JWTs stored in cookies.
Write an Architecture Decision Record explaining the context, decision, consequences,
and alternatives I considered.
```

---

### Debug a hard-to-reproduce bug
Type `/debug` then describe the bug:

```
My API returns a 500 error only when two users submit a form at the same time.
It works fine with a single user. Help me find the root cause.
```

---

### Scaffold a new domain using DDD
Type `/ddd`:

```
Create a new Orders domain with entities, value objects, a repository interface,
and a domain service following Domain-Driven Design principles.
```

---

### Auto-generate a PR description
Type `/pr-description` — the agent reads your git diff and writes a clear PR title and description automatically. No input needed.

---

### Plan a complex goal before building
Type `/goal-plan`:

```
I want to add real-time notifications to this app. Users should get notified
when someone comments on their post. Plan how to build this step by step.
```

---

### Refactor safely
Type `/refactor`:

```
Refactor the PaymentService class to separate concerns. It currently handles
validation, processing, and email notifications all in one place.
```

---

## Step 4: Memory — The AI Learns Over Time

The `memory` MCP server gives agents **persistent memory across sessions**. The longer you use Ruflo, the more it knows about your project.

**Store something manually:**
```
@memory-keeper Remember that this project uses PostgreSQL with Prisma ORM
and we always use the repository pattern for database access.
```

**Recall something:**
```
@memory-keeper What do you know about how this project handles the database?
```

**It also stores automatically:** After every successful task, the `memory-store` hook saves what worked so agents can reuse that pattern in future sessions.

---

## All Slash Commands

Type `/` in the chat input to see the full list:

| Command | What it does |
|---|---|
| `/sparc` | 5-phase structured workflow: Spec → Design → Build → Test → Complete |
| `/testgen` | Generate missing tests for all untested code paths |
| `/security-audit` | Full OWASP Top 10 vulnerability scan |
| `/code-review` | Structured review with a LOW / MEDIUM / HIGH / CRITICAL risk score |
| `/adr` | Write an Architecture Decision Record |
| `/ddd` | Scaffold a Domain-Driven Design domain |
| `/goal-plan` | Turn a plain-English goal into a step-by-step agent task plan |
| `/pr-description` | Generate a PR title and description from your git diff |
| `/debug` | Systematic root-cause analysis for a bug |
| `/refactor` | Safely refactor code using tests as a safety net |

---

## What Happens Automatically

These fire in the background without you asking:

| When | What happens |
|---|---|
| You edit any source file | Prettier / ESLint / Black formatting is suggested |
| Before you commit | Scan blocks commits containing hardcoded secrets or API keys |
| You edit a source file | Warning appears if a corresponding test file is missing |
| A task completes | The successful pattern is saved to memory for future sessions |

---

## File Structure

```
.vscode/
  mcp.json                 ← The 5 MCP tool servers (memory, filesystem, GitHub, etc.)

.github/
  copilot-instructions.md  ← Global rules applied to every single AI request
  agents/                  ← The 10 specialist agents (@coder, @tester, etc.)
  prompts/                 ← The slash commands (/sparc, /testgen, etc.)
  instructions/            ← Auto-applied coding rules matched by file type
  hooks/                   ← Automatic triggers (format, secret detection, memory)

QUICKSTART.md              ← This file
```

---

## Troubleshooting

**"I don't see the agent selector / @agent-name doesn't work"**
Make sure you're in **Agent** mode. Click the mode selector at the bottom of the chat input and switch to Agent.

**"MCP server won't start or shows an error"**
Open a terminal and run:
```
node --version
npm --version
```
Both should print version numbers. If they don't, install Node.js from [nodejs.org](https://nodejs.org), then fully restart VS Code and try again.

**"Slash command doesn't do anything"**
Slash commands only work in **Agent** mode. Switch the mode at the bottom of the chat panel.

**"The AI forgot what I told it last session"**
The `memory` MCP server must be running. Press `Ctrl+Shift+P` → `MCP: List Servers` — confirm `memory` shows a green/running status. If it's stopped, click Start.

**"Agent not available in the list"**
Reload VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`.

---

## Quick Reference

```
Ctrl+Alt+I                 Open Chat
/                          Show all slash commands
@agent-name                Call a specific agent

Task → Agent:
  Big / multi-part task   → @swarm-orchestrator
  Fully autonomous run    → @autopilot
  Write code              → @coder
  Write tests             → @tester       or /testgen
  Security check          → @security     or /security-audit
  Code review             → @reviewer     or /code-review
  System design / ADRs    → @architect    or /adr
  Documentation           → @docs
  DevOps / CI / logging   → @devops
  Memory store / recall   → @memory-keeper
```
