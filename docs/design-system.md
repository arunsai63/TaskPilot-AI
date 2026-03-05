# Design System — Kyoto Night

Theme: Midnight ink with wisteria accent. Deep sumi-ink charcoal backgrounds (`#0f0d0a`) echo ink on washi paper. Surfaces use controlled translucency — glass with a warm violet tint in the borders rather than cold white. The accent is fuji/wisteria purple (藤色, `#9b8bc8`), a beloved traditional Japanese color, against warm kinari cream text (`#e4ddd0`) rather than generic cold blue-white. A washi fiber grain texture (SVG `feTurbulence`) sits on `body::before` at 2.8% opacity, `mix-blend-mode: overlay`, for tactile paper depth.

---

## Color Palette

### Backgrounds — ink/washi layering
| Variable        | Value                      | Purpose                          |
|-----------------|----------------------------|----------------------------------|
| `--bg-base`     | `#0a0c10`                  | Page background (deep ink)       |
| `--bg-primary`  | `#0a0c10`                  | Alias for bg-base (compat)       |
| `--bg-surface`  | `#10131c`                  | Elevated surface (drawers, cards)|
| `--bg-secondary`| `#10131c`                  | Alias for bg-surface (compat)    |
| `--bg-elevated` | `#181c28`                  | Tooltips, popovers               |
| `--bg-card`     | `rgba(16, 19, 28, 0.78)`   | Glass card background            |
| `--bg-card-hover`| `rgba(22, 26, 38, 0.85)`  | Card hover state                 |

### Glass — washi paper translucency
| Variable         | Value                           | Purpose                  |
|------------------|---------------------------------|--------------------------|
| `--glass-bg`     | `rgba(16, 19, 28, 0.78)`        | Glass surface background |
| `--glass-border` | `rgba(220, 200, 245, 0.07)`     | Warm-violet tinted border|
| `--overlay-modal`| `rgba(4, 5, 10, 0.85)`          | Modal backdrop           |
| `--blur-sm`      | `8px`                           | Subtle blur              |
| `--blur-md`      | `16px`                          | Card blur                |
| `--blur-lg`      | `24px`                          | Nav/header blur          |

### Borders — warm violet tint (not cold white)
| Variable          | Value                        |
|-------------------|------------------------------|
| `--border`        | `rgba(220, 200, 245, 0.08)`  |
| `--border-subtle` | `rgba(220, 200, 245, 0.05)`  |
| `--border-default`| `rgba(220, 200, 245, 0.08)`  |
| `--border-strong` | `rgba(220, 200, 245, 0.15)`  |

### Text — kinari/washi cream tones
| Variable          | Value     | Reference                         |
|-------------------|-----------|-----------------------------------|
| `--text-primary`  | `#e4ddd0` | Kinari (生成り) — raw silk cream  |
| `--text-secondary`| `#9890a2` | Muted warm grey                   |
| `--text-tertiary` | `#5a5468` | Dim purple-grey                   |
| `--text-muted`    | `#3c3848` | Near-invisible hints              |

### Accent — fuji/wisteria purple (藤色)
| Variable         | Value                         | Use case                   |
|------------------|-------------------------------|----------------------------|
| `--accent`       | `#9b8bc8`                     | Primary interactive color  |
| `--accent-hover` | `#b8a8e0`                     | Hover state                |
| `--accent-strong`| `#c0b0e8`                     | Brighter accent            |
| `--accent-dim`   | `#6a5a9e`                     | Darker accent, ring border |
| `--accent-subtle`| `rgba(155, 139, 200, 0.12)`   | Tinted backgrounds         |
| `--accent-glow`  | `rgba(155, 139, 200, 0.22)`   | Glow shadow                |
| `--gradient-accent`| `linear-gradient(135deg, #9b8bc8 0%, #c09ad8 50%, #7868b8 100%)` | Button backgrounds |

### Semantic — muted Japanese pigments
| Variable           | Value                      | Japanese reference        |
|--------------------|----------------------------|---------------------------|
| `--success`        | `#8bbfa0`                  | Kokemidori (苔色) — moss |
| `--warning`        | `#d4a870`                  | Kin (金色) — gold lacquer|
| `--danger`         | `#c47880`                  | Beni (紅色) — crimson    |

### Timer — Japanese nature/season colors
| Variable              | Value                       | Japanese reference          |
|-----------------------|-----------------------------|-----------------------------|
| `--focus-color`       | `#c49ed8`                   | Fuji no hana (藤の花) — wisteria blossom |
| `--break-color`       | `#80b8c8`                   | Nando (納戸色) — dark teal  |
| `--long-break-color`  | `#90c4a0`                   | Take (竹色) — bamboo green  |

### Sakura decorative (桜色)
| Variable        | Value                       |
|-----------------|-----------------------------|
| `--sakura`      | `#d490a8`                   |
| `--sakura-subtle`| `rgba(212, 144, 168, 0.08)`|
| `--sakura-glow` | `rgba(212, 144, 168, 0.25)` |
| `--hagi`        | `#c87cac`                   | 萩色 — bush clover / Japanese clover (petal variant) |

---

## Typography

Font stack: `'DM Sans', -apple-system, sans-serif` for UI; `'DM Mono', 'JetBrains Mono', monospace` for timer.

Google Fonts:
```
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap
```

### Size scale
| Variable      | Value | Use case                 |
|---------------|-------|--------------------------|
| `--text-xs`   | 11px  | Section labels, badges   |
| `--text-sm`   | 13px  | Secondary text, metadata |
| `--text-base` | 15px  | Body text                |
| `--text-md`   | 17px  | Emphasized body          |
| `--text-lg`   | 20px  | Sub-headings             |
| `--text-xl`   | 24px  | Page titles              |
| `--text-timer`| 64px  | Timer display            |

---

## Border Radius

| Variable       | Value  |
|----------------|--------|
| `--radius-xs`  | 4px    |
| `--radius-sm`  | 8px    |
| `--radius-md`  | 12px   |
| `--radius-lg`  | 18px   |
| `--radius-xl`  | 26px   |
| `--radius-full`| 9999px |

---

## Shadow System

| Variable         | Value                                                               |
|------------------|---------------------------------------------------------------------|
| `--shadow-xs`    | `0 1px 2px rgba(0,0,0,0.5), 0 0 0 1px rgba(220,200,245,0.04)`     |
| `--shadow-sm`    | `0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(220,200,245,0.05)`     |
| `--shadow-md`    | `0 4px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5), ...`      |
| `--shadow-lg`    | `0 12px 40px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6), ...`    |
| `--shadow-accent`| `0 0 0 1px var(--accent-dim), 0 4px 20px var(--accent-glow), ...` |

---

## Background Texture

Two-layer texture system:

**1. Washi fiber grain (`body::before`)**
SVG `feTurbulence` noise (fractalNoise, baseFrequency 0.72, 4 octaves) tiled at 300×300px. `opacity: 0.028`, `mix-blend-mode: overlay`, `position: fixed`, `z-index: 1`, `pointer-events: none`. Simulates washi paper fiber structure.

**2. Dot grid (body `background-image`)**
```css
radial-gradient(rgba(212, 168, 112, 0.022) 1px, transparent 1px)
background-size: 28px 28px
```
Gold-tinted dots at 2.2% opacity. Adds subtle tactile grid. Two additional radial gradients overlay warm gold (top) and sakura pink (lower-left) ambient light zones.

---

## Glass Surfaces

```css
background: var(--glass-bg);                /* rgba(16,19,28,0.78) */
backdrop-filter: blur(var(--blur-md));      /* 16px */
-webkit-backdrop-filter: blur(var(--blur-md));
border: 1px solid var(--glass-border);     /* rgba(220,200,245,0.07) — warm violet */
box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.07);
```

---

## Japanese Decorative Elements

### Floating Sakura Petals (`SakuraPetals` in App.jsx)
10 SVG elements using a heart-notch petal path (`M6,14 C2,10 0,7 ...`), fixed position behind all content, `z-index: 0`, `pointer-events: none`. 8 petals use `--sakura`, 3 use `--hagi` for color variety. Each runs two compound animations: `sakuraFall` (lateral drift fall) + `sakuraTumble` (rotation rhythm) for 3D tumble effect. Durations 13–20s, staggered delays.

### Timer Scene (state-reactive, inline in `Timer.jsx`)
Three mutually exclusive scenes rendered below the timer controls, switching on `mode.key` and `running`:
- **Focus + paused**: `MtFujiPausedScene` — Mt. Fuji silhouette with torii gate, moon, snow cap, and lake reflection. `opacity: 0.088`.
- **Focus + running**: `IncenseWisps` — 3 rising smoke paths with `stroke-dashoffset` draw cycle. Centered, width 80.
- **Break mode** (short or long): `ToriiBreakScene` — torii gate centered in misty mountain landscape with mist drift animation, water shimmer, and moon. `opacity: 0.09`.

### Origami Crane (`OrigamiCraneScene` in `src/components/OrigamiCraneScene.jsx`)
Tasks page empty state. Geometric crane perched on bamboo stalk. Bamboo has 3 nodes and 3 leaf strokes. Crane wings use `--accent`, body is `--text-primary` at low opacity. Crane group floats via `emptyFloat 4s infinite`; bamboo is stationary.

### Floating Lantern (`FloatingLantern` in `src/components/FloatingLantern.jsx`)
Reminders page empty state. Paper lantern with nested rects for depth, warm inner glow ellipse (`rgba(255,240,180,0.8)`), vertical ribs, tassel. Wrapper uses `.lantern-glow` class (float + glow-pulse via `lanternGlow` keyframe, alternates 4s).

### Enso Ripple (`EnsoRipple` in `src/components/EnsoRipple.jsx`)
Focus page — absolutely positioned 200×200 behind the stopwatch numerals. When `active`:
- Outer ring pulses outward via `ensoRipple` (scale 1 → 1.22, fade out, 3s infinite)
- Main enso circle draws in via `ensoDraw` (stroke-dashoffset 497 → 0, 2.4s forwards)
- `key={active}` on the SVG forces animation replay each time a session starts
- Fades in/out via `opacity` transition (600ms ease)

### KanjiMark (`src/components/KanjiMark.jsx`)
Reusable SVG kanji watermark. Font stack: `'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'MS Gothic', serif`. `opacity: 0.055`, `pointer-events: none`. Gracefully invisible on devices without CJK fonts (fixed SVG dimensions prevent layout impact).

Assignments per page:
| Page      | Kanji | Reading  | Meaning               |
|-----------|-------|----------|-----------------------|
| Timer     | 集    | shuu     | concentration, gather |
| Tasks     | 務    | mu       | duty, task            |
| Focus     | 禅    | zen      | zen, meditation       |
| Stats     | 績    | seki     | achievement, result   |
| Reminders | 時    | toki     | time, moment          |

### Wave Header (inline `WaveHeader` in StatsPage.jsx)
SVG wave at top of Stats page. Two-layer: filled wave path + stroke outline, `--break-color`. Both paths use `.wave-shift` (slow 12s drift). `opacity: 0.07`.

### Mt. Fuji Silhouette (inline `MtFuji` in StatsPanel.jsx)
SVG absolutely positioned at the bottom of the 7-day heatmap card, `opacity: 0.055`. Features: two flanking background peaks, Fuji's concave-slope body, snow cap with a ridgeline detail line. Color is `var(--accent)`.

### Incense Wisps (`IncenseWisps` in `src/components/IncenseWisps.jsx`)
Renders `null` when `!running`. Three `<path>` elements using `pathLength="100"` and CSS class-driven `stroke-dashoffset` animation. Each wisp has a different delay (`smoke-wisp-1/2/3`) and curve direction. Incense stick and glowing ash tip included.

---

## Animation Keyframes (Japanese decorative set)

Defined in `index.css`, before the desktop media query:

| Keyframe       | Duration | Use                                               |
|----------------|----------|---------------------------------------------------|
| `smokeDraw`    | 3.2s ×3  | Incense wisp stroke draw/fade cycle               |
| `mistDrift`    | 8s       | Mist band horizontal sway in ToriiBreakScene      |
| `ensoDraw`     | 2.4s     | Enso circle stroke-dashoffset draw-in (forwards)  |
| `ensoRipple`   | 3s       | Outer enso ring scale/fade pulse                  |
| `lanternGlow`  | 4s alt   | Drop-shadow glow pulse on FloatingLantern         |
| `waveShift`    | 12s      | Slow horizontal wave drift in WaveHeader          |
| `inkExpand`    | —        | Reserved — ink splash expand (not yet used)       |
| `sakuraTumble` | 5s       | Rotation rhythm for SVG petal compound animation  |

CSS utility classes: `.smoke-wisp`, `.smoke-wisp-1/2/3`, `.enso-draw`, `.enso-ripple`, `.lantern-glow`, `.wave-shift`, `.mist-drift`.

---

## Component Visual Rules

### Cards
Glass bg + blur + warm-violet border + shadow-sm + top inset highlight.

### Buttons
- Primary: wisteria gradient, no border, accent-glow shadow; hover lifts with shadow-accent
- Secondary: `rgba(255,255,255,0.05)` bg; hover lifts
- Active: `transform: scale(0.92)` for circular buttons

### Inputs
- `rgba(255,255,255,0.04)` bg; warm-violet border-default
- Focus: accent border + accent-subtle box-shadow ring

### Toggles
Base: `--toggle-accent: var(--accent)`. Override per-element via `style={{ '--toggle-accent': 'var(--warning)' }}` for reminder cards. Thumb animates with spring cubic-bezier.

### Nav
Both header and bottom nav: frosted glass `rgba(8,12,20,0.85)` + `blur(24px) saturate(180%)`. Bottom nav active state shows a 2px accent indicator bar at the top of the button. Desktop nav uses `.nav-btn.active` with accent-subtle background.
