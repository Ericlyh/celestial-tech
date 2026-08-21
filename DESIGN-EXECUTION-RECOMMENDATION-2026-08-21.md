# Celestial Tech — Execution Path Recommendation (2026-08-21)

> Companion to `DESIGN-AUDIT-2026-08-21.md` and
> `DESIGN-REVAMP-PROPOSAL-2026-08-21.md`. Recommends how to execute the
> chosen design direction.

## The three options the user asked about

### Option 1 — "By yourself"

**What this means in our org**: I (Claude Code host) own the design + code,
using only what's already installed in the repo.

**Strengths**
- Zero coordination overhead — I can iterate in hours, not weeks
- No new accounts, no vendor contracts, no dependencies
- Stack stays minimal: Next.js + Tailwind + Framer Motion + Lucide (already installed)
- Code stays owned in-repo, no external design artifacts to lose

**Weaknesses**
- Design taste is constrained to my training — risks "looks AI designed"
- No original illustration assets (would need to source or generate)
- No professional brand / typography review

**Best fit for**: Direction B (Console Modernism) — it's a *system*, not
art. Type discipline + ASCII ornament + monospace everything is
something I can ship well. Cheapest and fastest path to "no longer
generic."

### Option 2 — "With help of open-design"

**What this means in our org**: Use Hermes Agent's `popular-web-designs`
skill (54 reference design systems: Stripe, Linear, Vercel, Anthropic,
Mistral, Clay, Cohere, ElevenLabs, Mercury, etc.) plus the `claude-design`
skill for design process / taste. I iterate against real, named reference
systems rather than from a blank page.

**Strengths**
- Starts from proven visual languages — less risk of "AI slop"
- Real design tokens, real type hierarchies, real component patterns
- I can mix-and-match across systems (e.g. Linear's restraint + Anthropic's warmth + Clay's illustration feel)
- No vendor contracts, no outside dependency
- Fast: a few hours of iteration to produce something distinctive

**Weaknesses**
- Still limited to my own judgment on taste
- Reference systems may not match the "Celestial" brand DNA specifically
- Risk of producing something that's "good but derivative"

**Best fit for**: Direction A (Atlas of Stars) — I can study Stripe Press,
Anthropic, Mercury, and editorial astronomy sites as reference points,
extract what works, and apply it to Celestial Tech's brand DNA. This is
the *highest-quality* path that doesn't require external help.

### Option 3 — "minimax design"

**What this means**: MiniMax's design system / Anthropic's design system
(or whichever you meant — both exist as references in our tooling).

**Strengths**
- Anthropic's design language is genuinely distinctive (warm cream + terracotta, editorial serif, generous whitespace, opinionated) and would fit Direction A very well
- A named design system gives you defensible brand consistency
- If a human designer is involved, their taste improves the result

**Weaknesses**
- "Using X's design system" without their team means we're copying, not commissioning — and the visual signal becomes "we look like X," which is fine for some brands, off-putting for others
- If "minimax design" means commissioning a designer (human or AI design service), it adds weeks of coordination and a real budget line ($3–10k for a freelance illustrator + designer)
- Anthropic's identity is tied to *their* positioning — applying it to Celestial Tech without adaptation can feel borrowed

**Best fit for**: Direction C (Risograph Cosmos) — only a real
illustrator can deliver the off-register print feel. If the user wants
this direction, it's the only path that gets there credibly.

## My recommendation: hybrid, phased

| Phase | Direction | Path | Why | Effort |
|---|---|---|---|---|
| **Phase 1 (now → 2 weeks)** | B — Console Modernism | Self-execute (Option 1) | Fastest, cheapest, most distinct per dollar. Proves the concept before committing budget. | 1–2 weeks |
| **Phase 2 (2–4 weeks)** | A — Atlas of Stars (overlays B for `/`, `/hermes-agent-hosting` hero) | Open-design (Option 2) using Anthropic + Mercury + Stripe Press as references | Builds on Phase 1's typography discipline. Uses the brand's actual DNA. Highest-quality result possible without commissioning. | 2–3 weeks |
| **Phase 3 (only if user commits)** | C — Risograph Cosmos, scoped to blog & openclaw pages | Anthropic-design-style commissioned illustrator | If Phase 1+2 ship and the user wants the premium option, this is the cherry on top. | 3–5 weeks |

### Why this phasing

- **Don't pay for Direction C illustrations until you've validated Direction B works for your audience.** A common mistake is to spend $5–10k on commissioned illustration and then discover the audience wanted something else.
- **Direction B costs nothing and ships in 1–2 weeks.** You can A/B test it. If your existing audience converts better or the same, you saved $0 by deferring the more ambitious work.
- **Direction A is the natural second step.** Once you've broken the "cyan/violet AI template" addiction with B, you'll have a clearer sense of whether editorial typography (A) or riso illustration (C) better fits the brand you actually want.

### What you decide

The user picks:
1. **One direction** (A / B / C) — or a deliberate hybrid
2. **One path** (self / open-design / minimax-design) — or the phased hybrid above
3. **Sign-off to start implementation**, OR another iteration on the
   proposal (e.g. "show me what Direction A looks like on the
   `/hermes-agent-hosting` page" before committing)

If you want to compare visually before deciding, two standalone HTML
hero mockups are already in the repo:
- `mockups/atlas-of-stars-hero.html` (Direction A)
- `mockups/console-modernism-hero.html` (Direction B)

Open them in a browser. They're self-contained — no build step.