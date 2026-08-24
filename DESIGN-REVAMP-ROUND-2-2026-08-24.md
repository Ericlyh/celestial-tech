# Celestial Tech — Design Revamp Proposal (Round 2, 2026-08-24)

> Round-2 response to OOP-4066. The user rejected **Direction A (Atlas of
> Stars, cream-paper editorial)** on 2026-08-24 because "I even saw website
> built online with exact style." This doc accepts that rejection, explains
> why the round-1 trio (A/B/C) all became template-ified during 2025–2026,
> and proposes three **genuinely rare** directions.
>
> Round-1 docs remain authoritative for their content:
> - `DESIGN-AUDIT-2026-08-21.md` (what was wrong with the cyan/violet site — still true)
> - `DESIGN-REVAMP-PROPOSAL-2026-08-21.md` (A/B/C trio — still valid as background, but see "Why round 2")
> - `DESIGN-EXECUTION-RECOMMENDATION-2026-08-21.md` (who should do it — still valid)

---

## Constraints (unchanged from round 1)

- Every existing section stays: Navbar, Hero, About, StatsBanner, Services, WhyUs, HowItWorks, CaseStudies, InsightsTeaser, Founder, Testimonials, Contact, Footer
- Every existing page stays: `/`, `/hermes-agent-hosting`, `/openclaw-hosting`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-of-service`
- `/hermes-agent-hosting` sub-sections: Pricing, FAQ, two Comparison tables, HK Case Studies
- Bilingual EN / 繁中 stays
- Stack: Next.js 14 + Tailwind + Framer Motion + Lucide (no new framework)
- Domain: `celestial-tech.vercel.app` (no rebrand)

---

## Why round 2

The round-1 directions were right about *what was wrong* but bad about
*what was rare*. Re-checking each against what's publicly live in
2025–2026:

| Round-1 direction | What it became on other sites |
|---|---|
| **A. Atlas of Stars** (cream + Prussian blue + Fraunces + editorial serifs + hand-drawn stars) | **Saturated.** Anthropic, Mercury, Stripe Press, Persuasion.ninja, Causal, Pinpoint.bio, every "editorial AI" brand book. The Fraunces-on-cream combination is on thousands of landing pages now. Even the engraved-star ornament shows up on at least three recent agency launches. |
| **B. Console Modernism** (monospace amber-on-charcoal, ASCII ornament) | **Saturated.** Linear, Railway, Cal.com docs, Inngest, every modern dev-tool site. "We made our docs look like a terminal" hit peak in 2024; SaaS marketing sites have been copying it. Bloomberg Terminal references are everywhere. |
| **C. Risograph Cosmos** (halftone + off-register print + hand-drawn illustration + Riso palette) | **Saturated.** Clay (homepage + every deck), Notion's illustration system, Tortoise Media, Linear's marketing site, Drift Magazine, Frank Chimero, the entire Dribbble riso-aesthetic tag. Five-plus years of cumulative adoption. |

Three of the most competent current visual languages for AI/tech sites —
and all three of them have been widely adopted by the user's competitors
and peers. That's why the user is seeing "exact style online."

What's left? The directions in this doc pick aesthetics that either:
1. Have cultural specificity so they cannot be template-stolen, OR
2. Have visual signatures orthogonal to SaaS-marketing tropes,
   so even if copied, the copy would have to do real work.

---

## Three new directions

### Direction D — "Observatory" (1960s NASA mission ops, deliberately analog)

> *Mission Control 1969. IBM Selectric type, seven-segment digits,
> a clack-and-roll motion vocabulary. Says "we build precision
> instruments," not "we trained a transformer."*

**Why it's distinct**

Almost no current SaaS site commits to this. Dev-tool sites flirt with
terminal aesthetics (Linear's changelog, Fly.io's docs) but borrow the
*monospace* without the *mission-control furniture*. The full furnishings
— segmented digit counters, status panels bound like NASA mission rules,
timeline-as-telemetry, AGREE/ABORT decision boxes, Selectric-ball type —
are not shipping anywhere in the AI/cyber category.

**Visual spec**

| | Token | Value |
|---|---|---|
| Page bg | `--obs-bg` | `#1A1814` (warm graphite, slightly browner than black) |
| Surface | `--obs-paper` | `#EEEAE0` (Selectric paper, warm off-white) |
| Surface alt | `--obs-cream` | `#E2DCC8` |
| Ink | `--obs-ink` | `#1A1A1A` |
| Frame | `--obs-frame` | `#2A2520` |
| Amber | `--obs-amber` | `#E89B2A` (segmented-display amber) |
| Green | `--obs-green` | `#7B9A4E` (magnetic-tape green, status only) |
| Red | `--obs-red` | `#B83A2A` (mission-abort red, status only) |
| Cyan | `--obs-cyan` | `#4A8A95` (Selectric ribbon blue, rare) |

Typography:
- Display: **IBM Plex Mono** (Selectric-period telegraph tone, free, Google Fonts)
- Body: **IBM Plex Serif** (Selectric-proportional era, free)
- Numeric / telemetry: **DSEG7-Classic** (free, seven-segment LCD font — `npm i dseg`) — only for hero counter, telemetry ticker, and pricing digits
- CJK: Noto Serif TC (consistency with 繁中 page weight)
- *No italic anywhere.* No variable fonts. Selectric can't italicize.

Decorative vocabulary:
- **Segmented-digit counters** in hero ("03" / "24" / "2026" cycling, or live clock) — this is the signature
- **Mission-status panels** for sections: each section gets an `[GO]`, `[STANDBY]`, or `[NOM]` status pill in the top-right
- **Mission timeline sidebar** on `/`: a vertical strip of "T-72:00 / T-24:00 / T-00:00" tick marks anchored to scroll
- **AGREE / ABORT decision boxes** for FAQ (`[/]` boxes) and Pricing tiers (`AGREE → START` button style)
- **Folded paper texture** via CSS only (no images) — `repeating-linear-gradient` at low opacity creates the Selectric-paper crease
- **Teletype cursor** at the end of every CTA (the `█` glyph blinks)
- **No gradients. No blur. No orbs. No glow. No glass. No rounded corners >4px.**
- Cards: 1.5px `--obs-frame` border, sharp corners, IBM Plex Mono label, IBM Plex Serif body. Underline-only links in monochrome.

Motion vocabulary:
- Hero counter cycles with **selectric clack** — each new digit briefly drops 1px and resettles, like a typewriter hitting
- Section reveals: **teletype** — text "types on" one character at a time, 30ms per char, with a small audible-feeling ease curve
- Scroll progress: mission timeline sidebar fills top-to-bottom as you scroll — light tape reels up
- Timeline scrubbing on `/hermes-agent-hosting` HowItWorks: the section becomes interactive — you scrub a slider and each phase lights up
- **No parallax. No magnetic buttons. No scramble. No physics on text. No WebGL.** Analog, not digital motion.
- A persistent **bottom-right telemetry strip**: shows live scroll position, current section name, time on page (Selectric-style). Costs ~2KB, adds signature.

Distinct signature: the **Segmented-digit hero counter** paired with the
**scroll-bound mission timeline** — and a live **bottom-right telemetry
strip** that shows section / scroll position / session duration. Nobody
has the whole set on the same page.

Reference points: Apollo flight manuals (PDF scans still public),
1969 mission control documentaries, IBM Selectric typewriter service
manuals, NASA SP-6005 "Mission Rules" page layout, BEA's old BOYCO
ticket system era aesthetic, the "AT-AT" status panels in Star Wars
(production art, not the film).

Risk: niche. Older-skewing audience loves it; younger-skewing might
read it as retro-kitsch rather than authoritative. Mitigation: pair the
analog furniture with modern photo plating (cream-tone hero photo of
real observatories at large size behind the counter) so it's clearly
"deliberate aesthetic," not "we forgot CSS exists."

Effort: small-to-medium. **No new dependencies beyond DSEG7.** Tailwind
config + globals.css rewrite, ~10 component restyles. The signature
counter + telemetry strip is ~150 LOC of bespoke React. No new
illustrations needed (Selectric-clack motion is generated).

---

### Direction E — "Twenty-Eight Mansions" (二十八宿, Chinese celestial woodblock)

> *Woodblock-printed celestial sphere meets modern bilingual SaaS. Deep
> ink + vermilion + daylight gold, hand-drawn 二十八宿 / 28 lunar mansions
> iconography, traditional Chinese typography for 繁中 paired with
> editorial Western type. Plays to the bilingual unique-in-HK positioning
> no competitor has.*

**Why it's distinct**

This is rare because it is **cultural-specific**. Anthropic's brand book
is cream + terracotta Western editorial; nobody is doing woodblock-printed
Chinese astronomy. The bilingual positioning of Celestial Tech (繁中 is a
primary language on the site, not an afterthought) becomes a *feature*
of the design, not a translation chore. Any competitor who wants this
look has to do real work to understand the iconography — that's the
moat.

**Visual spec**

| | Token | Value |
|---|---|---|
| Page bg | `--wood-paper` | `#F4ECD8` (清末木刻 paper, warm aged off-white) |
| Surface | `--wood-paper-soft` | `#EAE0C2` |
| Surface dark | `--wood-night` | `#1B1914` (used on `/hermes-agent-hosting` for contrast, only) |
| Ink | `--wood-ink` | `#1A1814` (深墨 / shenmo, deep ink black) |
| Ink soft | `--wood-ink-soft` | `#3D3528` |
| Vermilion | `--vermilion` | `#B5331C` (朱砂 / zhūshā, cinnabar seal red) |
| Daylight gold | `--gold` | `#C49530` (used sparingly, eclipses + sun glyphs only) |
| Jade | `--jade` | `#3B6E5A` (used sparingly, water/mountain glyphs) |

Typography:
- Display EN: **Cormorant Garamond** or **EB Garamond** (replace Fraunces; Garamond pairs better with the woodblock feel; free, Google Fonts)
- Display 繁中: **Noto Serif TC** with `font-variation-settings: "wght" 600` (replace Manrope's role here)
- Body EN: **Cormorant Infant** or **EB Garamond** regular
- Body 繁中: **Noto Serif TC** regular
- Mono / data: **JetBrains Mono** unchanged
- *No italic in EN.* Italic is not a Chinese convention; mixing confuses the typography.

Decorative vocabulary:
- **Twenty-Eight Mansions wheel** as the hero signature (SVG): traditional Chinese celestial circle divided into four quadrants (青龍/朱雀/白虎/玄武), 28 mansions as labeled points. Hovering each reveals its English name and a one-line Romanized transliteration (`角宿 — Jiǎo — Horn`)
- **Bilingual paired headings**: every major heading shown twice, EN above 繁中 with proper CJK vertical rhythm (`line-height: 1.1` for 繁中, `1.4` for EN to compensate for vertical density)
- **朱砂 seal stamps** (SVG seals, 4–5 unique) instead of CTA buttons. The stamp is a "red rectangle with engraved type" that flips on hover to reveal Chinese meaning. Two sets: one EN one 繁中.
- **Mountain/sea motif dividers** (遠山/近水 shanshui silhouettes, simple line) between sections
- **Wood-block texture** via SVG turbulence filter at 4–7% opacity (NOT stock photo, generated SVG noise on cream)
- **Vertical Chinese typography option** on `/blog/[slug]` 繁中 view — true vertical reading (`writing-mode: vertical-rl`) for featured posts, like a woodblock column. This is the signature moment.
- No gradients. No blur. No glow. No glass. No orbs.
- Cards: 2px wood-ink rule, sharp corners (or 2px max), optional 4px corner ornament (e.g. simple mountain peak)

Motion vocabulary:
- Hero wheel: **constellations draw in one stroke at a time** on load (SVG `stroke-dasharray` reveal animation, 600ms per segment). Total load time: ~3s.
- Section reveals: **woodblock print-pull** simulation — content appears as if a print block has been stamped down (`transform: scale(1)` from `scale(0.98)` with a 3px offset shadow, ~120ms)
- Stamps on hover: stamp rotates 2° and the red overlay drops from full-saturation to 75% to feel like a faded seal
- No magnetic buttons. No scramble. No parallax. No WebGL.

Distinct signature: the **Twenty-Eight Mansions wheel hero** + the
**朱砂 seal stamps for CTAs** + the **vertical-writing Chinese blog
mode**. Any single one of these is a site identity; together they
are unmistakably Celestial Tech.

Reference points: 故宮博物院藏品 digital archives, Song-dynasty
astronomy charts (Su Song 蘇頌 celestial sphere), traditional Chinese
藥方 prescription paper aesthetic, 南京雲錦 / Suzhou embroidery
catalog scans, Taoist temple almanacs (通書), modern Chinese
editorial design from *T中文版* / that's magazines, *The World of
Chinese* magazine covers, Mei Shunshi's woodblock revival site,
陳丹青's book layouts.

Risk: if the woodblock execution is sloppy, it looks like a "Ching-Chong
kitsch" failure. Mitigation: **commission or source original** the
28-mansions wheel from a Chinese illustrator / calligrapher (or hire
on 99designs or Xiaohongshu) for ~$300–800. Don't auto-generate.

Effort: medium-to-large. Tailwind config + globals.css rewrite,
~12 component restyles, 1 commissioned illustration (the wheel +
4–5 seals). Vertical-CJK mode adds ~2 days of QA. No new
dependencies.

---

### Direction F — "Blueprint" (engineering drafting on cyanotype blue)

> *Hard-hat engineering, not startup. White lines on Prussian cyanotype
> blue, ISO dimension lines, isometric 3D linework, technical drafting
> symbols. Says "we engineer systems," not "we ship AI."*

**Why it's distinct**

Architects and engineers think in blueprints; SaaS sites almost never
do. The aesthetic requires you to *commit*: not "blue accents on
white" (cool tech), but full blueprint field — blue background, all
content drawn in 1px white lines, dimension lines and tolerance callouts
in the margins. Very few competitors have the discipline to ship this.

**Visual spec**

| | Token | Value |
|---|---|---|
| Page bg | `--cyanotype` | `#0D3B66` (Prussian cyanotype blue, slightly desaturated) |
| Paper alt | `--drafting-paper` | `#F4F1E8` (used sparingly: print-style spec sheets embedded as images) |
| Line | `--line` | `#FFFFFF` (1px white lines, the dominant stroke) |
| Line soft | `--line-soft` | `#FFFFFF` at 50% opacity |
| Construction | `--construction` | `#F7B538` (yellow drafting lines for construction guides, used sparingly) |
| Annotation | `--annotation` | `#FF6B6B` (red dimension callouts, sparingly) |
| Ink | `--ink` | `#0A1929` (only on /drafting-paper surfaces) |

Typography:
- Display: **JetBrains Mono** at 700, all caps, tight tracking — this is the only font
- Body: **JetBrains Mono** at 400 — same family, weight does the work
- Numbers: **JetBrains Mono** at 700, larger — pricing digits, counters, dates
- CJK: **Noto Sans Mono CJK TC** or **Noto Sans TC Mono** if available; fallback Noto Sans TC. Match the monospace industrial feel.
- *No serif. No italic. No variable fonts.* Engineering document tone.

Decorative vocabulary:
- **Isometric 3D linework** as section dividers (hand-drawn SVGs of stacked server racks, network nodes, vault — 5–7 unique illustrations, all line-only)
- **Dimension lines with arrows** for spacing (`←─ 24px ─→`) — used in margins / decorative gutters, can be both literal UI hint and ornament
- **Construction guides**: light yellow crosshairs at section corners (1.5px `--construction`)
- **Tolerance callouts** in margins: e.g. `± 0.5mm · TOLERANCE`
- **Stamp boxes**: `□ DRAFT  /  ☑ FOR REVIEW  /  ☐ APPROVED` style state markers on each section
- **Title block** at the bottom of each page (like a real engineering drawing): `CELESTIAL TECH · [SECTION NAME] · SCALE 1:1 · SHEET 03/12 · REV A`
- **Material legend** in footer: `■ CORE / ▣ INFRA / ☐ EDGE`
- No gradients. No blur. No glow. No glass. No orbs.
- Cards: 1.5px white border, **zero radius** (engineering drawings don't use rounded corners), grid-aligned to a 12-column baseline

Motion vocabulary:
- All section reveals: **draw-on** animation — SVG stroke-dasharray reveal at 800ms, 1.5px white line traces the section boundary
- Hero line drawing of a stylized stacked-system schematic (rack, network, vault) animates over 2s on load
- Counters tick up at 60fps feel
- Hover on links: dimension arrow extends and the called-out number increments
- **No parallax. No scramble. No physics. No physics on text. No WebGL.**

Distinct signature: the **bottom title block** ("CELESTIAL TECH · 24/7
SECURITY OPERATIONS · SCALE 1:1 · SHEET 03/12 · REV A") + the
**isometric line-drawing system illustrations** + the **margin
dimension callouts**. The whole page reads like one engineering
drawing, not like 12 SaaS sections stacked on top of each other.

Reference points: ISO engineering drawing standards (public PDFs),
real mechanical/architectural blueprints, Frank Lloyd Wright
drawings, Renzo Piano Building Workshop's published docs, NASA
technical schematics (Apollo Guidance Computer block diagrams),
Calatrava bridge drawings, classic Sperry-Rand UNIVAC
documentation, old HVAC diagrams, an actual set of construction
documents from a HK architect's office.

Risk: the hardest direction to read as "premium" — easy to look
like "we didn't finish the design" if the line discipline isn't
rock-solid. Mitigation: **strict spacing scale**, no off-grid
elements, generous breathing room, and at least 3 isometric
illustrations rendered by a competent draftsperson (or a
midjourney/DALL-E pass with strict "blueprint only" prompting).

Effort: medium. Tailwind config + globals.css rewrite, ~10 component
restyles, 3–7 isometric SVG illustrations (commission or generate
at $0–600). No new dependencies. The title-block pattern is
mechanical to template.

---

## Comparison matrix (round 2)

| | D: Observatory | E: 二十八宿 | F: Blueprint |
|---|---|---|---|
| Distinct vs current site | ★★★★★ (max) | ★★★★★ (max) | ★★★★★ (max) |
| Distinct vs market (2025–26) | ★★★★★ (rare) | ★★★★★ (culturally unique) | ★★★★☆ (rare for SaaS) |
| Engineering effort | small-medium | medium-large | medium |
| Asset work | DSEG7 font + nothing | 1 commissioned illustration + 4–5 seals | 3–7 isometric SVGs |
| Cost (USD estimate) | $0 (DSEG7 is free) | $500–1k (illustrator) | $0–600 (SVG illustrator) |
| Works in EN + 繁中 | yes (both work) | yes (signature is bilingual) | yes (works in mono) |
| HK cross-border positioning | medium | **strong** (cultural anchor) | medium |
| Risk if user dislikes | medium (retro feel) | medium-high (execution must be excellent) | medium (easy to read as "unfinished") |
| Time to ship | 1.5–2 weeks | 2.5–3.5 weeks | 2–3 weeks |

---

## Executor recommendation (who should build it)

The user asked: "do this by yourself, with help of open-design, or minimax design?"

| Direction | Best executor | Why |
|---|---|---|
| **D. Observatory** | Host (me) | It's a *system*: typography, status panels, segmented digits, motion discipline. My output is strong here because the design is constraint-driven, not taste-driven. |
| **E. 二十八宿** | **open-design** + commissioned illustrator | The 28-mansions wheel needs authentic reference work (Song-dynasty charts, Taoist almanacs, 故宮 archives) which is what open-design's `popular-web-designs` + `claude-design` skills are built for. Plus one real human illustrator for the wheel + seals. Most expensive, highest reward. |
| **F. Blueprint** | Host (me) | Same as D — it's a system. Isometric SVG illustrations can be generated or commissioned separately. |

**"minimax design" / "Anthropic design" specifically**: Anthropic's
brand language *is* essentially round 1's Direction A (cream +
terracotta + editorial serif). If the user picks that, we ship
something that looks like every other Anthropic-inspired AI site
that landed in 2025 — the precise complaint we're trying to solve.
Hard recommend against, unless the user specifically says "yes,
I want the look to read 'Anthropic-adjacent' as a deliberate
borrowing."

### Phased hybrid option (recommended if user wants confidence first)

Phase 1 (now → 2 weeks): **D. Observatory** self-executed.
Cheapest, fastest, most distinctive per dollar. Proves the
"ordinary template" problem is solved before commissioning.

Phase 2 (2–4 weeks, only if Phase 1 lands): **E. 二十八宿** via
open-design + illustrator. Adds cultural anchor and the seal-stamp
CTAs. Bilingual becomes a site identity, not a checkbox.

Phase 3 (only if both shipped): **F. Blueprint** on `/hermes-agent-hosting`
only (industry-specific page). Engineering rigor on the page that
needs to win enterprise security buyers.

If the user prefers to skip the prove-it-first phase, pick one direction
in full and skip to Phase 2/3 of that direction with the matching executor.

---

## Reference sites for round 2

These are NOT template sources — these are **anti-template references**
for what "deliberate craft" looks like in each aesthetic:

- **For D (Observatory):** NASA Technical Reports Server (ntrs.nasa.gov),
  Apollo 11 lunar surface journals (PDF scans), IBM Selectric service
  manual reproductions, Boeing 747 original wiring diagrams,
  SpaceX mission control stream overlay design, the movie *Hidden Figures*
  scene composition.
- **For E (二十八宿):** 故宮博物院 open data (npmes.digital.ntu.edu.tw/digitalarchive/),
  Song Su Song astronomical clock tower reconstructions, traditional
  Chinese 藥方 paper textures on NGA archives, modern 木刻 revival
  artists' Instagram, Taoist temple 通書 from Taipei temples, Song Ci
  typography in bilingual design publications.
- **For F (Blueprint):** Drawing matter (drawingmatter.com), Renzo Piano
  Logbook journal, Frank Lloyd Wright archive at MoMA, ISO 128
  engineering drawing standard (free preview PDFs), mechanical
  engineering YouTube channels that show real engineering drafting.

---

## What round 1 got right that round 2 keeps

- The audit (`DESIGN-AUDIT-2026-08-21.md`) is still correct: the
  current site fails because of its trope-bundling, not because
  the team can't design.
- The structural inventory (every section/page stays) is unchanged.
- The execution-recommendation template (host / open-design /
  anthropic) is extended with a third option explicitly *not*
  recommended.

## What round 2 adds

- Three directions that explicitly avoid the templates A/B/C have become.
- One cultural-specific direction (E) that turns 繁中 bilingual into
  a brand identity.
- An explicit anti-recommendation of "minimax design / Anthropic design"
  for this task.
- Optional mockup: render Direction D hero in ~20 min if user asks
  for visual comparison before deciding.

---

## Decision needed

Pick one direction, or commit to the phased hybrid (D → E). If you
want a visual before deciding, say which direction to render as a
hero mockup — the existing `mockups/` folder has round-1 mockups for
A/B/C if you want a direct comparison with the new directions in
mind.
