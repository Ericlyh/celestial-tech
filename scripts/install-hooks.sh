#!/usr/bin/env bash
# install-hooks.sh — configure git to use this repo's hooks directory
# Re-run any time you clone fresh or want to reset.

set -euo pipefail
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
HOOKS_DIR="${REPO_ROOT}/scripts/git-hooks"

if [[ ! -d "${HOOKS_DIR}" ]]; then
  echo "ERROR: ${HOOKS_DIR} does not exist"
  exit 1
fi

# Make all hooks executable
chmod +x "${HOOKS_DIR}"/* 2>/dev/null || true

# Point git at the local hooks dir
git config core.hooksPath scripts/git-hooks
echo "✅ Installed git hooks from ${HOOKS_DIR}"
echo "   (core.hooksPath = scripts/git-hooks)"
echo ""
echo "Test it:"
echo "  git commit --allow-empty -m 'test: hook smoke'"
echo "  sqlite3 /opt/data/openclaw-workspace-makethingsdone/events/events.db \\"
echo "    \"SELECT created_at, event_type, description FROM events ORDER BY id DESC LIMIT 1;\""
