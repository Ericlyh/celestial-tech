# Celestial Tech — Design Audit (2026-08-21)

> Companion to OOP-4066. Audits the current visual language of the website
> hosted at `celestial-tech.vercel.app` and identifies why it reads as
> "ordinary and typical" — i.e. indistinguishable from the dozens of
> AI/cyber SaaS templates the user has been seeing online.

## 1. Inventory

### Routes in the codebase (`app/`)

| Route | Purpose | Key components |
|---|---|---|
| `/` | Homepage | Navbar, Hero, About, StatsBanner, Services, WhyUs, HowItWorks, CaseStudies, InsightsTeaser, Founder, Testimonials, Contact, Footer |
| `/hermes-agent-hosting` | Hermes Agent AI-employee product page | Hero, Features, HowItWorks, Pricing, Testimonials, Case Studies, FAQ, Comparison tables (×2), Contact |
| `/openclaw-hosting` | Legacy URL for the same page | mirrored |
| `/blog`, `/blog/[slug]` | Blog listing + posts | bilingual markdown renderer |
| `/privacy-policy`, `/terms-of-service` | Legal | shared `LegalPage` |
| `/api/cron`, `/api/blog`, `/api/contact` | Backend endpoints | Prisma + SQLite + Resend |

### Sections to preserve in any revamp

`Navbar` · `Hero` · `About` · `StatsBanner` · `Services` (tabbed Cyber/AI) · `WhyUs` ·
`HowItWorks` · `CaseStudies` · `InsightsTeaser` · `Founder` · `Testimonials` · `Contact` · `Footer`.
On `/hermes-agent-hosting`: also `Pricing` (3 tiers), `FAQ`, two `Comparison` tables,
and `HK Case Studies`. Blog + legal pages stay.

## 2. The current visual language

### Palette (`tailwind.config.js`, `globals.css`)

```
deep-space     #070A14   page background
space-mid      #0E1322
space-soft     #161C30
stellar-cyan   #5EEAD4   primary accent (legacy: cyber-cyan)
stellar-cyan-soft #A7F3D0
cosmic-violet  #A78BFA   secondary accent (legacy: cyber-purple)
cosmic-violet-soft #C4B5FD
nova-amber     #F4B860   rare 3rd accent
ink.{50–500}   blue-gray neutrals
pure-white     #FFFFFF   text + glass card base
```

### Typography

- Display: **Fraunces** (variable serif, optical sizing) — actually a smart pick
- Body: **Manrope** — modern, geometric
- Mono: **JetBrains Mono** — for data/code
- CJK: Noto Sans TC

### Decorative vocabulary

- `StarCanvas.tsx` — particle starfield in the hero
- Concentric stellar rings (5 sizes, 140–460px) with a center cyan dot + 6 orbiting violet points
- Floating blur orbs (3 sizes, cyan / violet / amber, 700/500/300px) with `blur-3xl opacity-30`
- `GradientMesh` — animated gradient orbs
- Hero grid overlay (`60px × 60px`, 4% opacity cyan lines)
- Glass cards: `bg-white/[0.03]` + `backdrop-blur-md` + thin white border
- Neon glows: `box-shadow 0 0 20px rgba(94,234,212,0.3)` etc.
- Stock photos: `bg-cyber-code.jpg`, `bg-circuit.jpg`, `bg-handshake.jpg` at 5–6% opacity
- SVG noise filter overlay (`opacity: 0.025`, `mix-blend-overlay`)

### Animations (`components/Animations.tsx`)

`ScrambledText` (char-randomize load), `CounterValue` (0→N scroll-triggered),
`RevealGroup`/`RevealItem` (clip-path stagger), `MagneticButton` (cursor-tracking),
`GradientMesh` (animated blur orbs).

## 3. What makes it read as "ordinary and typical"

The site is a **well-executed instance** of the most common 2024–2026
"AI / cybersecurity SaaS" template. Every individual piece is competent.
The problem is the *combination*:

1. **The dark deep-space gradient + cyan/violet neon + grid + glass + glow orbs is the canonical "AI startup" look.** It's on Linear, Vercel community templates, every Framer template marketplace, every "build a SaaS in 24h" YouTube tutorial. The user has seen it hundreds of times.

2. **The cyan (#5EEAD4) + violet (#A78BFA) accent pair is the single most-used AI/tech palette of 2024–2026.** Nothing about it signals a particular company — it just signals "we're a tech company, please take us seriously."

3. **The "Stellar Cartography" theme name promised a strong concept — but the execution is the generic version.** Real stellar cartography is hand-drawn star charts, old astronomy books, ink on cream paper, Tycho Brahe's nova, antique astrolabes. The current site delivers concentric rings + blur orbs + particle canvas instead. The metaphor is wasted.

4. **Hero decoration is the same five-element starter pack.** Every AI/cyber site ships: gradient bg + grid overlay + glow orbs + concentric rings + particle field. Subtract any of these and you wouldn't notice.

5. **The Fraunces serif + Manrope sans pairing is good typography, but it's wearing the same outfit as everyone else.** It can't carry the differentiation alone.

6. **Section patterns are all SaaS-default:** tabbed services, 3-card case studies, 3-card testimonials, badge + headline + subtitle on every section, frosted-glass cards with 6% white border, mono uppercase "01/02/03" labels.

7. **Stock background images (cyber-code.jpg, circuit.jpg, handshake.jpg) at 5–6% opacity read as placeholder-y.** Even with the noise filter on top, the silhouettes of "person at computer" and "handshake" leak through.

8. **The color names themselves ("stellar-cyan", "cosmic-violet", "nova-amber") are poetic but the resulting hexes don't behave differently from any other AI site.** A more honest palette would actually commit to the celestial idea.

9. **Motion vocabulary is competent but unbranded.** ScrambledText, magnetic buttons, gradient meshes, counter values — all of these are in the popular-web-designs templates skill. They look like the kind of thing every Tailwind starter ships.

10. **No memorable signature moment.** Nothing in the page is *only* Celestial Tech's. Take the logo off and you couldn't tell whose site this is.

### What IS working (worth keeping)

- Fraunces serif display type — distinctive, has personality
- Manrope body — cleaner than Inter
- JetBrains Mono for data — appropriate
- Bilingual (en / 繁中) — actual differentiator for HK market
- Real content density — blog, case studies, founder, testimonials, FAQ, comparison tables
- `/hermes-agent-hosting` page has rich, specific content (Cantonese AI, FPS, Telegram) — the substance is excellent, only the styling is generic
- Solid Next.js 14 + Tailwind + Framer Motion stack — easy to iterate

## 4. The brand DNA that's currently being wasted

"Celestial" + "Tech" + "Cybersecurity meets AI" is a **rich, underexploited** combination:

- **Stellar cartography**: hand-drawn star charts, the celestial sphere, antique atlases
- **Alchemy / hermeticism**: the project itself is called *Hermes Agent* — Hermes Trismegistus, mercury, sacred geometry
- **Constellation mythology**: Cassiopeia, Orion, Cygnus — each constellation has a story
- **Historical astronomers**: Tycho Brahe's nova, Hypatia, al-Sufi's Book of Fixed Stars
- **Astrolabes and orreries**: functional mechanical objects that look like art
- **The night sky as a security metaphor**: stars as endpoints, lines of sight as firewalls, the celestial equator as a perimeter

None of this DNA is visible on the page. The site is generic AI cyber
with "Celestial" in the logo and a particle canvas. That's the gap.

## 5. Recommended next step

See `DESIGN-REVAMP-PROPOSAL-2026-08-21.md` — it proposes three
genuinely distinct directions that all preserve every section and
page, plus a recommendation on execution path.