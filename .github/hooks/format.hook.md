---
name: format
description: Auto-format edited files using the project's configured formatter.
triggers:
  - onFileEdit
---

After every file edit, run the appropriate formatter based on file type:

- `**/*.{ts,tsx,js,jsx,mjs,cjs}` → `npx prettier --write $file` then `npx eslint --fix $file`
- `**/*.py` → `python -m black $file` then `python -m isort $file`
- `**/*.rs` → `cargo fmt -- $file`
- `**/*.go` → `gofmt -w $file`
- `**/*.{json,yaml,yml,md}` → `npx prettier --write $file`

If the formatter is not installed, warn once per session rather than failing loudly.

Do not format files in:
- `node_modules/`
- `dist/`
- `build/`
- `.git/`
- Any path matching `.gitignore`
