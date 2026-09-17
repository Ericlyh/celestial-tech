## Sprint W34 Plan — celestial-tech

**Velocity:** 15 events this week (↑ vs last week's 11)
**Blockers:** 56 open (49 stale >7 days — all IG-stale for DZUltEmEpc2)
**Phase:** Build
**Generated:** 2026-08-17 01:00 HKT (Monday)

### This Week (08-10 → 08-16)
- **7 IG-engagement cron runs** (08-10 → 08-16) — daily-cadence heartbeat_ok + 1 overdue post flagged each day
- **EngageKit** play continues as the active engagement-engine side; 9 7-7-7 candidate axes sit waiting on the publish pipeline

> Daily-cadence IG engagement is on autopilot: 0 posts in 7d daily-cadence window, 1 post (DZUltEmEpc2, ~70d old) flagged for backfill daily. The DZUltEmEpc2 post is the same one flagged every day since 2026-06-09 — recurring daily blocker.

### Open Blockers
- IG post DZUltEmEpc2: 70d old, no engagement snapshots (recurring daily IG-stale blocker) — recommended label 30d, skip escape available
- ~50 IG-stale duplicate rows for the same post (one per day)

### Recommendations
- **prioritize** — celestial-tech is the IG-engagement cockpit + the upstream for EngageKit data. Skipping the daily IG-stale flag is NOT OK (loses data-loss signal).
- **decide once on IG-stale DZUltEmEpc2** — backfill the 30d snapshot OR mark stale-and-move-on. Recurring 70d flag is a known-acceptable dust unless Ethan wants it cleared.
