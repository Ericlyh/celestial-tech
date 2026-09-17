#!/usr/bin/env python3
"""
log_ig_post.py — Log a Celestial Tech Instagram post to the MTD events.db.

Usage:
    python3 log_ig_post.py \
        --url "https://www.instagram.com/p/XXXXX/" \
        --type carousel \
        --pillar T \
        --hook-zh "..." --hook-en "..." \
        --hashtags "#CyberSecurity #AISecurity #CelestialCyber"

Or interactively (prompts for each field).

Log line will be:
    event_type   = ig_post_published
    project_id   = celestial-tech (id 5)
    description  = "[<type>] <short title>"
    context      = JSON of post_url, pillar, hook_zh, hook_en, hashtags, post_type
"""
import argparse
import json
import os
import sqlite3
import sys
from datetime import datetime, timezone, timedelta

# Default to the MTD events.db. Override with MAVIS_EVENTS_DB env var.
DEFAULT_DB = os.path.expanduser(
    "~/.hermes/profiles/makethingsdone/openclaw-workspace-makethingsdone/events/events.db"
)

PILLAR_MAP = {
    "T": "threat-intel",
    "P": "defensive-playbook",
    "A": "ai-cyber-take",
    "F": "field-notes",
    "D": "discussion",
}
POST_TYPES = {"single", "carousel", "reel", "story", "poll", "discussion"}


def get_db_path():
    db = os.environ.get("MAVIS_EVENTS_DB", DEFAULT_DB)
    if not os.path.exists(db):
        sys.exit(f"events.db not found at: {db}\nSet MAVIS_EVENTS_DB env var to override.")
    return db


def resolve_project_id(db, project_name="celestial-tech"):
    cur = db.execute("SELECT id FROM projects WHERE name = ?", (project_name,))
    row = cur.fetchone()
    if row is None:
        sys.exit(
            f"Project '{project_name}' not found in events.db. "
            f"Either create it first or pass --project."
        )
    return row[0]


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


def main():
    ap = argparse.ArgumentParser(description="Log an IG post into MTD events.db")
    ap.add_argument("--url", help="Instagram post URL (e.g. https://www.instagram.com/p/XXX/)")
    ap.add_argument("--type", choices=sorted(POST_TYPES), help="Post type")
    ap.add_argument("--pillar", choices=sorted(PILLAR_MAP.keys()),
                    help="Content pillar: T (threat) / P (playbook) / A (AI take) / F (field) / D (discussion)")
    ap.add_argument("--hook-zh", help="First-line hook in Traditional Chinese (zh-HK)")
    ap.add_argument("--hook-en", help="First-line hook in English")
    ap.add_argument("--hashtags", help="Hashtag set used (space-separated, with or without #)")
    ap.add_argument("--engagement", help="Optional JSON string with post metrics, e.g. '{\"likes\":120,\"comments\":14}'")
    ap.add_argument("--project", default="celestial-tech", help="Project name in events.db (default: celestial-tech)")
    ap.add_argument("--interactive", action="store_true", help="Prompt for each field")
    args = ap.parse_args()

    if args.interactive or not args.url:
        args.url = args.url or prompt("Post URL")
        args.type = args.type or prompt("Post type (single/carousel/reel/story/poll/discussion)")
        args.pillar = args.pillar or prompt("Pillar (T/P/A/F/D)")
        args.hook_zh = args.hook_zh or prompt("Hook (zh-HK)")
        args.hook_en = args.hook_en or prompt("Hook (en)")
        args.hashtags = args.hashtags or prompt("Hashtags (space-separated)", required=False)

    if args.type not in POST_TYPES:
        sys.exit(f"--type must be one of {sorted(POST_TYPES)}")
    if args.pillar not in PILLAR_MAP:
        sys.exit(f"--pillar must be one of {sorted(PILLAR_MAP.keys())}")

    db_path = get_db_path()
    db = sqlite3.connect(db_path)
    project_id = resolve_project_id(db, args.project)

    context = {
        "post_url": args.url,
        "post_type": args.type,
        "pillar": PILLAR_MAP[args.pillar],
        "hook_zh": args.hook_zh,
        "hook_en": args.hook_en,
        "hashtags": args.hashtags,
    }
    if args.engagement:
        try:
            context["engagement"] = json.loads(args.engagement)
        except json.JSONDecodeError as e:
            sys.exit(f"--engagement must be valid JSON: {e}")

    description = f"[{args.type}] {args.pillar} — {args.hook_en[:80] if args.hook_en else args.url}"

    db.execute(
        "INSERT INTO events (project_id, event_type, description, context) VALUES (?, ?, ?, ?)",
        (project_id, "ig_post_published", description, json.dumps(context, ensure_ascii=False)),
    )
    db.commit()

    print(f"✓ Logged ig_post_published for project {args.project} (id={project_id})")
    print(f"  url: {args.url}")
    print(f"  type: {args.type} / pillar: {PILLAR_MAP[args.pillar]}")


if __name__ == "__main__":
    main()
