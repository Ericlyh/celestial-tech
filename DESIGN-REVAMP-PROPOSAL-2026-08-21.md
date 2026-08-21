# Celestial Tech — Design Revamp Proposal (2026-08-21)

> Companion to `DESIGN-AUDIT-2026-08-21.md` and OOP-4066.
> Proposes **three distinct, complete visual directions** for the website
> revamp — each one preserves every existing section and page, keeps the
> existing stack (Next.js 14 + Tailwind + Framer Motion + Lucide), and
> includes enough spec to start implementation. Then recommends an
> execution path.

---

## Constraints (all three directions respect these)

- Every existing section stays: Navbar, Hero, About, StatsBanner, Services, WhyUs, HowItWorks, CaseStudies, InsightsTeaser, Founder, Testimonials, Contact, Footer
- Every existing page stays: `/`, `/hermes-agent-hosting`, `/openclaw-hosting`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-of-service`
- All sub-sections on `/hermes-agent-hosting` stay (Pricing, FAQ, two Comparison tables, HK Case Studies)
- Bilingual EN / 繁中 stays
- Stack stays: Next.js 14, Tailwind, Framer Motion, Lucide React
- Stack additions allowed only where the direction demands it (see each direction)
- No placeholder stock photos — replacement art must be original, generated, or commissioned
- All three directions keep the existing domain `celestial-tech.vercel.app` — i.e. no rebrand

---

## Direction A — "Atlas of Stars" (Editorial Cartography)

> *A printed astronomy book made interactive. Warm cream paper, deep ink,
> hand-drawn constellation lines, editorial serif type. Quiet authority.*

### Why this direction

The current site has **the right name and the wrong skin**. "Stellar
cartography" is the brand's natural territory — Direction A actually
delivers it. It also moves the site as far as possible from the
"AI startup template" the user is tired of.

### Visual spec

| | Token | Value |
|---|---|---|
| Page bg | `--paper` | `#F4EFE4` (warm cream, like old book paper) |
| Surface | `--paper-soft` | `#EDE5D3` |
| Ink | `--ink` | `#1B1A17` (near-black with warmth) |
| Ink soft | `--ink-soft` | `#4A443C` |
| Rule line | `--rule` | `#2D2A22` |
| Celestial | `--celestial` | `#1F3A8A` (Prussian blue — old map ocean) |
| Vermilion | `--vermilion` | `#C0392B` (Tycho Brahe's nova, alchemical mercury-red) |
| Gold leaf | `--gilt` | `#B78628` (typographic foil, used sparingly) |

Typography:
- Display: **Fraunces** (already installed) at 600 with strong negative tracking on hero — but on cream not dark
- Body: **Source Serif 4** for editorial body text (replace Manrope here)
- Caption / data: **JetBrains Mono** unchanged
- CJK: Noto Serif TC (replaces Noto Sans TC) for 繁中

Decorative vocabulary:
- Hand-drawn SVG constellation lines (Ursa Major, Orion, Cygnus — choose 3–4 that match sections)
- Engraved star symbols (★, ✦, ⁂) used as section dividers, not pills
- Wide horizontal rules with center ornament — book chapter style
- Compass rose in footer, astrolabe motif in About
- Star map background SVG behind hero, drawn in 1.5px ink lines on cream
- No orbs, no glows, no gradients on text. No glass cards. Solid cream surfaces.
- Cards: thin ink rule + 0–2px radius (book chapter boxes), gilt corner ornament optional

Motion vocabulary:
- Subtle. Stars fade in on hero load. Sections reveal with letter-by-letter kinetic typography (Fraunces variable, axis tweaks). Scroll progress bar styled as a brass telescope reticle.
- No magnetic buttons. No scrambled text. Editorial restraint.

Distinct signature: the **Hero constellation map** — a real SVG of the
northern sky, with the brand dot pinned at one specific star (e.g.
Polaris or a named star). Headline sits beside it, not on top of it.

Reference points: NY Times Graphics desk astronomy pages, Olsen's
*History of Astrolabes*, *Sky & Telescope* cover art, Penguin Classics
covers, Edward Tufte's books.

Risk: it's a confident direction. If the user wants "dark + neon," this
is wrong. But if they want *distinct*, this delivers.

Effort: medium. Tailwind config + globals.css rewrite, ~12 component
restyles, 3–4 original SVG illustrations (constellation lines, compass
rose, astrolabe, section ornaments). No new dependencies.

---

## Direction B — "Console Modernism" (Terminal-as-Aesthetic, done right)

> *Bloomberg Terminal meets a security operations center. Monochrome
> amber-on-charcoal, monospace everywhere, dense information layout,
> one accent color used surgically. Says "serious enterprise security"
> not "AI startup."*

### Why this direction

Cybersecurity firms *look like cybersecurity firms*. The current site
looks like an AI chatbot company with security services. Direction B
commits to the "serious security operator" tone that the brand actually
has credibility for.

### Visual spec

| | Token | Value |
|---|---|---|
| Page bg | `--console` | `#0A0A0A` (true console black, not blue-tinged) |
| Surface | `--console-elev` | `#121212` |
| Frame | `--frame` | `#1F1F1F` |
| Border | `--rule` | `#2A2A2A` |
| Body text | `--text` | `#D4D4D4` |
| Dim text | `--dim` | `#8A8A8A` |
| Hot | `--hot` | `#FFB000` (amber phosphor — Bloomberg Terminal) |
| Alert | `--alert` | `#FF3B30` (sparingly, real status only) |
| Good | `--good` | `#5EFF7A` (sparingly, real status only) |

Typography:
- All JetBrains Mono (replace Manrope as body). Fraunces is *out* — too editorial, wrong tone.
- Weights: 400 body, 500 labels, 700 mono callouts
- Tight tracking. No ligatures. No OpenType features.

Decorative vocabulary:
- ASCII-art section dividers (`─── ─── ───` or `┌─┐ │ │ └─┘`)
- Box-drawing characters for cards (proper Unicode tables)
- Section labels in `> CMD:` prefix style
- Status indicators as ASCII brackets (`[OK]`, `[WARN]`, `[—]`)
- No gradients. No blur. No glow. No orbs. No glass.
- Cards: 1px `--rule` border, 0 radius (or 2px max), monospace everything
- Hero: large monospace headline, ASCII star map or terminal session log

Motion vocabulary:
- Type-on typewriter effect for hero headline
- Cursor blink (1s ease-in-out infinite) on key CTAs
- Numeric counters still scroll-trigger (counts up like a terminal log)
- Section reveal: ASCII row draws left-to-right as a sweep, content snaps in
- No magnetic buttons. No gradients. No physics.

Distinct signature: the **Footer command palette** — instead of a
normal footer, the site ends with a `cmd>k help` prompt showing a
keyboard-navigable command list (a real keyboard-shortcut overlay you
can actually press). Bonus: `/` opens it.

Reference points: Bloomberg Terminal, Stripe press kit / API reference,
HashiCorp (Vagrant/Terraform docs), early Linear changelogs, sec.gov
EDGAR, sqs.io, Old Web 1.0 hacker culture deliberately reclaimed.

Risk: this is a *taste call*. Niche — but the cybersecurity audience
will love it, and the contrast with the current cyan/violet template
is total. It's also the cheapest direction to ship — the entire
Tailwind config simplifies, no decorative SVG art required.

Effort: small-to-medium. Tailwind config + globals.css rewrite, ~10
component restyles. ASCII art is faster than illustrated SVG. No new
dependencies.

---

## Direction C — "Risograph Cosmos" (Illustration-driven)

> *Bright primary-muted colors with intentional off-register print feel.
> Halftone textures. Hand-drawn celestial illustrations. Warm, tactile,
> unmistakably not-a-template.*

### Why this direction

The single biggest gap in the current site is **lack of memorable
visual signature**. Direction C solves that by leaning on illustration
instead of decoration. The site stops looking like every other AI
startup because it starts looking like a poster series.

### Visual spec

| | Token | Value |
|---|---|---|
| Page bg | `--paper` | `#FAF6EC` (off-white, paper-like) |
| Surface | `--paper-soft` | `#F2EAD3` |
| Ink | `--ink` | `#1A1A1A` |
| Coral | `--coral` | `#F25C54` (the warm pulse — Riso "Fluorescent Pink" stand-in) |
| Sun | `--sun` | `#F7B538` (Riso "Yellow" stand-in) |
| Sky | `--sky` | `#4A6FA5` (Riso "Blue" stand-in) |
| Fern | `--fern` | `#5A8C5A` (Riso "Green" stand-in) |
| Plum | `--plum` | `#7C5C9E` (Riso "Purple" stand-in) |

Typography:
- Display: **Fraunces** (already installed, perfect fit)
- Body: **Söhne** if available, otherwise Inter — but Inter is generic, so try **GT Walsheim** or **Söhne Mono**. With open-source constraint, **IBM Plex Sans** + **IBM Plex Serif** is a credible alternative.
- Mono: **JetBrains Mono** unchanged
- CJK: Noto Serif TC

Decorative vocabulary:
- Halftone dot patterns (CSS radial-gradient trick, 4px tiles) on accent backgrounds
- Off-register "print" effect: 2 colored shadows offset 4px each (no blur)
- Hand-drawn constellation illustrations as SVG (5–7 unique, per section)
- Section labels in mono with a coral underline
- Cards: cream paper texture, 2px ink rule, no shadow — small fern/sun illustration in corner
- No glow. No glass. No orbs. Halftone replaces blur.
- One color per section rotates (coral → sun → sky → fern → plum → coral), like a magazine spread

Motion vocabulary:
- Print-press simulation on hero load: colors "register" one at a time (coral snap, then sun, then sky)
- Section reveals: clip-path horizontal sweep like a print run
- Hover on cards: illustration rotates slightly (1–2°), color underneath shifts to the next palette color
- No magnetic buttons. No scramble. No physics on text.

Distinct signature: the **Hero illustration** — a hand-drawn
constellation figure (e.g. Orion, or a custom "Cygnus the Hacker Swan"
character) fills the right half. Hero copy sits in a cream-paper block
on the left. Background uses the coral + sun halftone.

Reference points: Clay's homepage (named swatches, artisanal feel),
Notion's illustration system, Linear's marketing illustrations,
Drift Magazine, Tortoise Media, Bloomberg Businessweek covers,
Brazilian Cordel prints, Frank Chimero's blog, Mailchimp's old
illustrations.

Risk: requires **illustration work**. Either commission a freelance
illustrator ($$$), generate via Midjourney/Stable Diffusion with strict
style anchoring, or build a smaller set of original SVG illustrations
in-house. The cost is the illustrations, not the code.

Effort: large. Tailwind config rewrite, halftone CSS system, 5–7
illustrations (commissioned or generated), ~14 component restyles.
Optional: add `tailwindcss-animate` or framer-motion-presets if not
already there.

---

## Comparison matrix

| | A: Atlas of Stars | B: Console Modernism | C: Risograph Cosmos |
|---|---|---|---|
| Distinct vs current | ★★★★★ (max) | ★★★★★ (max) | ★★★★☆ (high) |
| Distinct vs market | ★★★★★ (rare) | ★★★★☆ (some have done it) | ★★★★☆ (Clay-style niche) |
| Engineering effort | medium | small-medium | large |
| Asset work | 3–4 SVGs | mostly ASCII | 5–7 illustrations |
| Cost (USD estimate) | $1–3k (illustrator) | $0–500 | $3–10k (illustrator) |
| Works in EN + 繁中 | yes | yes | yes |
| Works for `/hermes-agent-hosting` HK page | yes (still works) | yes (still works) | yes (still works) |
| Risk if user dislikes | medium (too quiet?) | medium-high (too niche?) | low (illustration forgives a lot) |
| Time to ship | 2–3 weeks | 1–2 weeks | 3–5 weeks |

---

## Reference sites that look like nothing else

If the user wants to see "what good looks like" before deciding:

- **Stripe Press** (press.stripe.com) — editorial restraint done right
- **Linear** — dark mode that's not generic
- **Anthropic** — warm cream + terracotta, anti-AI-startup
- **Mistral** — orange + black, confident
- **Clay** — warm named swatches, illustration-led
- **Causal** — the original "calculator" SaaS, editorial
- **The Browser Company** — playful, opinionated
- **Pinpoint** (pinpoint.bio) — editorial biotech
- **Mercury** (mercury.com) — banking done warm
- **OpenAI's homepage** — when they redesigned, they ditched the neon
- **Figma Config landing pages** — each one a different visual experiment
- **Vercel's design archive** (vercel.com/design) — full case studies

---

## What I will *not* do

- Add a fourth "minimal" option that is just Vercel-style white-on-white. The current site isn't bad because it lacks minimalism — it's bad because the *specific minimalism* it chose is generic. More of the same won't help.
- Suggest "just swap the cyan to a different hue." Color swap ≠ redesign.
- Recommend gradients, blur, glassmorphism, neon, or particle effects — the current site has all of them and they're what's making it ordinary.
- Touch the `/api/*` endpoints, Prisma schema, or `events.db` automation — those are working code and not in scope.

---

## Decision needed

**Pick one direction (A / B / C) or a deliberate hybrid.** My recommendation
is in §5 of the comment on OOP-4066, with rationale.

If you want to see a real visual mockup before committing, the
fastest path is to pick one direction and have me render the Hero
section as a standalone HTML file against the existing brand assets —
that takes ~20 minutes and lets you compare without committing to
a full build.