#!/usr/bin/env bash
# scripts/install-snapshot-cron.sh
# One-time install for the weekly events.db snapshot cron.
# Adds a line to the current user's crontab (Sun 23:00 local time).
#
# Re-runnable — removes any prior MTD snapshot line before adding a fresh one.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
PYTHON="${PYTHON:-/usr/bin/python3}"
SCRIPT="${REPO_ROOT}/scripts/snapshot-events-db.py"
LOG="/var/log/mtd-snapshot.log"

# Marker comment so we can find/replace our own line
MARKER="# MTD-WEEKLY-EVENTS-SNAPSHOT"
CRON_LINE="${MARKER}\n0 15 * * 0  ${PYTHON} ${SCRIPT} --verify >> ${LOG} 2>&1"

if [[ ! -f "$SCRIPT" ]]; then
  echo "ERROR: $SCRIPT does not exist"
  exit 1
fi

# Make the script executable
chmod +x "$SCRIPT"

# Pull current crontab (empty if none) into a temp file
TMP="$(mktemp)"
crontab -l 2>/dev/null | grep -v "$MARKER" > "$TMP" || true

# Append our line
printf "%b\n" "$CRON_LINE" >> "$TMP"

# Install
crontab "$TMP"
rm -f "$TMP"

echo "✓ Installed weekly snapshot cron:"
echo "    ${CRON_LINE}"
echo ""
echo "Verify with:  crontab -l | grep MTD"
echo "Test with:    ${PYTHON} ${SCRIPT} --verify"
echo "Logs at:      ${LOG}"
