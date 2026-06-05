# Celestial Tech

> Where Cybersecurity Meets Artificial Intelligence

Modern, multi-page website for Celestial Tech — a premium cybersecurity and AI services company.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Event log:** SQLite at `events/events.db` (workspace-level, shared with all projects)

## Sections

1. Hero — Full-screen cyber-celestial background with CTAs
2. About — Company story and mission
3. Services — Tabbed Cybersecurity (6) / AI (4) pillars
4. Why Us — Differentiators and benefits
5. Case Studies — Success story cards
6. From the Founder — Personal credibility section
7. Testimonials — Client quotes
8. Contact — Form + calendar booking
9. Footer — Links, legal, social

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy

Pushed to Vercel — auto-deploys on push to `main`.

## Workspace automation

This repo participates in the MTD workspace's event-driven logging.

### Pre-commit event hook (already installed)

`scripts/git-hooks/pre-commit` runs on every `git commit` and writes a row to
`/opt/data/openclaw-workspace-makethingsdone/events/events.db` so the daily
task generator always knows what shipped. The hook is **non-blocking** —
logging failures print a warning but never abort the commit.

If you clone fresh, re-install it with:

```bash
./scripts/install-hooks.sh
git config --get core.hooksPath   # → scripts/git-hooks
```

Verify the hook is firing:

```bash
git commit --allow-empty -m "test: hook smoke"
sqlite3 /opt/data/openclaw-workspace-makethingsdone/events/events.db \
  "SELECT created_at, description FROM events ORDER BY id DESC LIMIT 1;"
```

### Weekly events.db snapshot (CT-014)

`scripts/snapshot-events-db.py` writes a timestamped copy of `events.db` to
`backups/events/`, retaining the last 8 weekly snapshots (~2 months).
Backups use SQLite's online backup API — safe to run while the DB is being
written to.

Install the weekly cron (Sun 23:00 local time):

```bash
./scripts/install-snapshot-cron.sh
crontab -l | grep MTD   # verify it's installed
```

Manual run:

```bash
python3 scripts/snapshot-events-db.py --verify
ls -lh backups/events/  # see the snapshots
```

The snapshot is the safety net behind the pre-commit hook: the hook keeps
the log current, the snapshot keeps the log recoverable.

---
*© 2026 Celestial Tech*
