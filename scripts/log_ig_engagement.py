#!/usr/bin/env python3
"""
log_ig_engagement.py — Log an Instagram engagement snapshot for an existing IG post
                       into the MTD events.db.

Pairs with log_ig_post.py. Call this ~24h, 7d, and 30d after a post to record
likes, comments, saves, and other metrics.

Usage:
    python3 log_ig_engagement.py \
        --url "https://www.instagram.com/p/XXXXX/" \
        --label 24h \
        --metrics '{"likes":342,"comments":27,"saves":89,"shares":12,"reach":1820}'

Or interactively:
    python3 log_ig_engagement.py --interactive

Event written:
    event_type   = ig_engagement_snapshot
    project_id   = celestial-tech (id 5) — or via --project
    description  = "[engagement:<label>] <post_url> — likes:N comments:M saves:K"
    context      = JSON of post_url, snapshot_label, metrics, captured_at
"""
import argparse
import json
import os
import sqlite3
import sys
from datetime import datetime, timezone, timedelta

DEFAULT_DB = os.path.expanduser(
    "~/.hermes/profiles/makethingsdone/openclaw-workspace-makethingsdone/events/events.db"
)

VALID_LABELS = {"24h", "7d", "30d", "manual"}


def get_db_path():
    db = os.environ.get("MAVIS_EVENTS_DB", DEFAULT_DB)
    if not os.path.exists(db):
        sys.exit(f"events.db not found at: {db}\nSet MAVIS_EVENTS_DB env var to override.")
    return db


def resolve_project_id(db, project_name):
    cur = db.execute("SELECT id FROM projects WHERE name = ?", (project_name,))
    row = cur.fetchone()
    if row is None:
        sys.exit(
            f"Project '{project_name}' not found in events.db. "
            f"Either create it first or pass --project."
        )
    return row[0]


def find_post_event(db, post_url, project_id):
    """Look up the original ig_post_published event for this URL."""
    cur = db.execute(
        """SELECT id, created_at, context FROM events
           WHERE project_id = ? AND event_type = 'ig_post_published'
             AND (description LIKE ? OR context LIKE ?)
           ORDER BY id DESC LIMIT 1""",
        (project_id, f"%{post_url}%", f"%{post_url}%"),
    )
    return cur.fetchone()


def find_existing_snapshots(db, post_url, project_id):
    """Return list of snapshot labels already recorded for this post URL."""
    cur = db.execute(
        """SELECT context FROM events
           WHERE project_id = ? AND event_type = 'ig_engagement_snapshot'
             AND (description LIKE ? OR context LIKE ?)
           ORDER BY id DESC""",
        (project_id, f"%{post_url}%", f"%{post_url}%"),
    )
    labels = []
    for (ctx_json,) in cur.fetchall():
        try:
            ctx = json.loads(ctx_json)
            if "snapshot_label" in ctx:
                labels.append(ctx["snapshot_label"])
        except (json.JSONDecodeError, TypeError):
            pass
    return labels


def prompt(label, default=None, required=True):
    suffix = f" [{default}]" if default else ""
    while True:
        val = input(f"{label}{suffix}: ").strip()
        if not val and default is not None:
            return default
        if val:
            return val
        if not required:
            return None
        print("  (required)")


def parse_metrics_arg(raw):
    """Accept either a JSON object string or a simple key:value,key:value format."""
    raw = raw.strip()
    if raw.startswith("{"):
        try:
            return json.loads(raw)
        except json.JSONDecodeError as e:
            sys.exit(f"--metrics must be valid JSON: {e}")
    # Fallback: likes=100, comments=10, saves=5
    out = {}
    for pair in raw.split(","):
        if "=" not in pair:
            continue
        k, v = pair.split("=", 1)
        try:
            out[k.strip()] = int(v.strip())
        except ValueError:
            out[k.strip()] = v.strip()
    if not out:
        sys.exit("--metrics could not be parsed. Pass JSON or 'k=v,k=v'.")
    return out


def main():
    ap = argparse.ArgumentParser(description="Log IG engagement snapshot into MTD events.db")
    ap.add_argument("--url", help="Instagram post URL")
    ap.add_argument("--label", choices=sorted(VALID_LABELS), default="24h",
                    help="Snapshot timing label (default: 24h)")
    ap.add_argument("--metrics", help="JSON object or 'k=v,k=v' string with the metrics")
    ap.add_argument("--project", default="celestial-tech", help="Project name (default: celestial-tech)")
    ap.add_argument("--force", action="store_true",
                    help="Overwrite a snapshot of the same label for this post (default: error if duplicate)")
    ap.add_argument("--interactive", action="store_true")
    args = ap.parse_args()

    if args.interactive or not args.url:
        args.url = args.url or prompt("Post URL")
        args.label = args.label or prompt("Snapshot label (24h/7d/30d/manual)", default="24h")
        if not args.metrics:
            print("Enter metrics one at a time. Blank line to finish.")
            metrics = {}
            for field in ("likes", "comments", "saves", "shares", "reach", "impressions"):
                v = prompt(f"  {field}", required=False)
                if v:
                    try:
                        metrics[field] = int(v)
                    except ValueError:
                        metrics[field] = v
            if not metrics:
                sys.exit("No metrics provided. Aborting.")
            args.metrics = json.dumps(metrics)

    metrics = parse_metrics_arg(args.metrics)
    if not isinstance(metrics, dict) or not metrics:
        sys.exit("--metrics must be a non-empty JSON object.")

    db_path = get_db_path()
    db = sqlite3.connect(db_path)
    project_id = resolve_project_id(db, args.project)

    # Verify the post event exists
    post_event = find_post_event(db, args.url, project_id)
    if post_event is None:
        sys.exit(
            f"No ig_post_published event found for url={args.url} in project={args.project}. "
            f"Log the post first with log_ig_post.py."
        )
    post_event_id, post_created_at, _ = post_event

    # Reject duplicate snapshot label unless --force
    existing_labels = find_existing_snapshots(db, args.url, project_id)
    if args.label in existing_labels and not args.force:
        sys.exit(
            f"Snapshot label '{args.label}' already exists for this post. "
            f"Pass --force to overwrite, or use a different label."
        )

    captured_at = datetime.now(timezone(timedelta(hours=8))).isoformat()
    context = {
        "post_url": args.url,
        "post_event_id": post_event_id,
        "snapshot_label": args.label,
        "metrics": metrics,
        "captured_at": captured_at,
    }
    description = (
        f"[engagement:{args.label}] {args.url} — "
        f"likes:{metrics.get('likes','-')} "
        f"comments:{metrics.get('comments','-')} "
        f"saves:{metrics.get('saves','-')}"
    )

    db.execute(
        "INSERT INTO events (project_id, event_type, description, context) VALUES (?, ?, ?, ?)",
        (project_id, "ig_engagement_snapshot", description, json.dumps(context, ensure_ascii=False)),
    )
    db.commit()

    print(f"✓ Logged ig_engagement_snapshot ({args.label}) for {args.url}")
    print(f"  metrics: {metrics}")
    if existing_labels:
        print(f"  other snapshots for this post: {existing_labels}")


if __name__ == "__main__":
    main()
