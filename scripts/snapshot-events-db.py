#!/usr/bin/env python3
"""
scripts/snapshot-events-db.py

Weekly safeguard: copy events/events.db to a timestamped backup inside
backups/events/. Retains last 8 weekly snapshots (≈2 months).

Why: the events DB is the source of truth for every project's history.
If it ever corrupts, gets rm -rf'd, or the disk dies, we lose the rebuild
receipt that let us re-scaffold promptlayer-pro in 8 hours.

Usage:
  python3 scripts/snapshot-events-db.py           # manual run
  python3 scripts/snapshot-events-db.py --verify  # verify the latest snapshot is readable

Cron install (Sun 23:00 HKT):
  0 15 * * 0  /usr/bin/python3 /opt/data/openclaw-workspace-makethingsdone/projects/celestial-tech/scripts/snapshot-events-db.py >> /var/log/mtd-snapshot.log 2>&1

Design choices:
- Uses sqlite3 backup API (online, safe to run while writes happen).
- Snapshot filename: events-YYYY-MM-DD-HHMMSS.db (sortable, no collisions).
- Retains last 8 (one snapshot per week × 2 months). Configurable via --keep N.
- Exits 0 on success, 1 on failure (caller can wrap with retry).
"""
import argparse
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

WORKSPACE_ROOT = Path("/opt/data/openclaw-workspace-makethingsdone")
SOURCE_DB = WORKSPACE_ROOT / "events" / "events.db"
BACKUP_DIR = WORKSPACE_ROOT / "backups" / "events"


def snapshot(keep: int = 8) -> Path:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y-%m-%d-%H%M%S")
    dest = BACKUP_DIR / f"events-{ts}.db"
    # sqlite3 backup API is online-safe; it grabs a consistent snapshot
    # even if the source is being written to concurrently.
    src = sqlite3.connect(str(SOURCE_DB))
    try:
        dst = sqlite3.connect(str(dest))
        try:
            with dst:
                src.backup(dst)
        finally:
            dst.close()
    finally:
        src.close()
    # Prune to keep last N
    snaps = sorted(BACKUP_DIR.glob("events-*.db"))
    for old in snaps[:-keep]:
        old.unlink()
        print(f"  pruned old snapshot: {old.name}")
    return dest


def verify(path: Path) -> bool:
    try:
        conn = sqlite3.connect(str(path))
        try:
            n_projects = conn.execute("SELECT COUNT(*) FROM projects").fetchone()[0]
            n_events = conn.execute("SELECT COUNT(*) FROM events").fetchone()[0]
            print(f"  verified {path.name}: {n_projects} projects, {n_events} events")
            return True
        finally:
            conn.close()
    except Exception as e:
        print(f"  VERIFY FAILED: {e}", file=sys.stderr)
        return False


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--keep", type=int, default=8,
                   help="Number of snapshots to retain (default 8 = ~2 months weekly)")
    p.add_argument("--verify", action="store_true",
                   help="After snapshot, verify the latest one is a valid SQLite file")
    args = p.parse_args()

    if not SOURCE_DB.exists():
        print(f"ERROR: source DB not found at {SOURCE_DB}", file=sys.stderr)
        return 1

    try:
        dest = snapshot(keep=args.keep)
        size = dest.stat().st_size
        print(f"snapshot: {dest}  ({size:,} bytes)")
    except Exception as e:
        print(f"SNAPSHOT FAILED: {e}", file=sys.stderr)
        return 1

    if args.verify and not verify(dest):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
