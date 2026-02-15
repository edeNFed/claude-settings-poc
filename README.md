# Claude Code Settings POC

Test repository to verify that `.claude/settings.json` from a PR branch is applied in CI headless mode.

## What this tests

When Claude Code runs in headless mode (GitHub Actions, `--print`, SDK), project settings from `.claude/settings.json` are loaded. This POC verifies that executable settings like `apiKeyHelper` and `hooks` are executed without the workspace trust dialog.

## Workflows

- `claude-review.yml` — Mirrors Anthropic's pattern: auto-triggers on PR opened
- `claude-interactive.yml` — Mirrors JetBrains/ideavim pattern: triggers on `/claude-review` comment
