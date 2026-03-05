# Design System — Kyoto Night

Theme: Midnight ink with wisteria accent. Deep `#0a0c10` backgrounds echo ink on washi paper. Surfaces use controlled translucency — glass with a warm violet tint in the borders rather than cold white. The accent is fuji/wisteria purple (藤色, `#9b8bc8`), a beloved traditional Japanese color, against warm kinari cream text (`#e4ddd0`) rather than generic cold blue-white.

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

The `body` has a subtle dot-grid pattern evocative of washi paper grain:
```css
background-image: radial-gradient(rgba(155, 139, 200, 0.025) 1px, transparent 1px);
background-size: 28px 28px;
```
Dots are 2.5% opacity wisteria purple. Invisible in isolation, adds subtle tactile depth.

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
7 petal-shaped divs, fixed position behind all content, `z-index: 0`, `pointer-events: none`. Opacity oscillates 0 → 0.042 → 0 over 13–20s. Each has a different `left` position and animation delay for random appearance. Uses `sakuraFall` keyframe with lateral translateX drift to simulate natural fall.

### Mt. Fuji Silhouette (inline `MtFuji` in StatsPanel.jsx)
SVG absolutely positioned at the bottom of the 7-day heatmap card, `opacity: 0.055`. Features: two flanking background peaks, Fuji's concave-slope body, snow cap with a ridgeline detail line. Color is `var(--accent)`.

### Sakura Branch (`SakuraBranch` in `src/components/SakuraBranch.jsx`)
Shared component used in TasksPage and RemindersPage empty states. Three branch strokes of decreasing weight (2.5px → 1.8px → 1.2px). Five five-petal flowers with circle clusters (petals at 72° intervals, distance 6.5×scale from center). Gold center dots use `var(--warning)`. Three scattered fallen petals as rotated ellipses at low opacity.

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
