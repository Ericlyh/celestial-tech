## Sprint W24 Plan — celestial-tech

**Velocity:** 8 events this week (↑ 8 vs last week's 0)
**Blockers:** 0 open (0 stale >7 days)
**Phase:** Build
**Generated:** 2026-06-08 09:00 HKT

### This Week
- [ ] CT-014: Weekly events.db snapshot safeguard — scripts/snapshot-events-db.py + install-snapshot-cron.sh + README updated. First snapshot verified: 155,648 bytes, 21 projects, 533 events. Snapshot uses sqlite3 online backup API (safe while DB is being written to). 1 commit (ba30bdc).  *(from 2026-06-05)*
- [ ] commit: README.md,STATE.yaml,scripts/install-snapshot-cron.sh (+4 files) [4 files changed, 201 insertions(+)]  *(from 2026-06-05)*
- [ ] CT-013: Pre-commit auto event-logger hook shipped  *(from 2026-06-04)*
- [ ] commit: STATE.yaml (+1 files) [1 file changed, 15 insertions(+)]  *(from 2026-06-04)*
- [ ] commit: scripts/git-hooks/pre-commit,scripts/install-hooks.sh (+2 files) [2 files changed, 112 insertions(+)]  *(from 2026-06-04)*

> Latest blocker this week: CT-012-BLOCKED: celestial-tech commits not auto-logging to events.db — need pre-commit hook (15 LoC)

### Recommendations
- **Prioritize** — active progress; recent decision: _Vercel deployment failed: devDependencies not installed by default — add vercel.json with installCommand include=dev_
