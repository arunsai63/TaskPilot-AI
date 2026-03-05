# Animation System

---

## Library Decision

**framer-motion** is used exclusively for exit animations (modal close, list item delete). CSS handles all other motion: page transitions, hover lifts, ring glow, heatmap grow, button active states. This split keeps the bundle lean while enabling the one class of animation CSS cannot do — animating elements out of the DOM.

Install: `npm install framer-motion`

All framer-motion variant objects live in `src/utils/animations.js`. No variant objects defined in component files.

---

## Duration Tokens

```js
// src/utils/animations.js
export const DURATION = {
  fast:     80,   // micro-feedback (active state flash)
  normal:   160,  // default interactive response
  slow:     220,  // modals, page transitions
  verySlow: 400,  // stat count-up, heatmap grow
}
```

---

## Easing Constants

```js
export const EASE = {
  out:    [0.25, 0.46, 0.45, 0.94],  // decelerate — most exits and entrances
  in:     [0.55, 0.055, 0.675, 0.19],// accelerate — elements leaving screen
  spring: { type:'spring', stiffness:380, damping:38 },         // modal sheet
  springSnappy: { type:'spring', stiffness:400, damping:25 },   // faster spring
  springPop:    { type:'spring', stiffness:500, damping:28 },   // checkbox pop
}
```

---

## Framer-Motion Variant Objects

All exported from `src/utils/animations.js`.

### pageVariants
Navigation between tabs (currently unused — CSS `page-enter` class handles this).
```js
{ hidden: { opacity:0, y:6 }, visible: { opacity:1, y:0, transition:{duration:0.16} }, exit: { opacity:0 } }
```

### listItemVariants
Task cards and reminder cards on mount + delete exit.
```js
hidden:  { opacity:0, y:8 }
visible: (i) => ({ opacity:1, y:0, transition: { duration:0.22, delay: min(i,7)*0.03 } })
exit:    { opacity:0, x:-8, transition: { duration:0.16 } }
```
Usage: `<motion.div variants={listItemVariants} initial="hidden" animate="visible" exit="exit" custom={index}>`
Wrap list with `<AnimatePresence>`.

### modalOverlayVariants
Backdrop fade for all modals.
```js
{ hidden:{opacity:0}, visible:{opacity:1,transition:{duration:0.15}}, exit:{opacity:0,transition:{duration:0.15}} }
```

### modalSheetVariants
Bottom sheet animation (mobile modals).
```js
{ hidden:{y:'100%'}, visible:{y:0,transition:EASE.spring}, exit:{y:'100%',transition:{duration:0.2,ease:'easeIn'}} }
```

### modalCenterVariants
Center dialog animation (desktop modals).
```js
{ hidden:{opacity:0,scale:0.96,y:8}, visible:{opacity:1,scale:1,y:0,transition:{duration:0.18}}, exit:{opacity:0,scale:0.97,y:4} }
```

### statCardVariants
Stats page metric cards stagger in on mount.
```js
hidden:  { opacity:0, y:12 }
visible: (i) => ({ opacity:1, y:0, transition: { duration:0.24, delay: i*0.06 } })
```

---

## CSS Keyframes

Defined in `src/index.css`.

| Keyframe       | Duration  | Effect                                    |
|----------------|-----------|-------------------------------------------|
| `enterFade`    | 240ms     | Fade + translateY(6px) — list items       |
| `pageEnter`    | 200ms     | Fade + translateY(8px) — page transition  |
| `ringPulse`    | 4s loop   | Opacity 1→0.82→1 — running timer ring     |
| `dotPop`       | 300ms     | Scale 1→1.5→1 — completed session dot    |
| `heatmapGrow`  | 500ms     | scaleY 0→1 — heatmap bars on load        |
| `emptyFloat`   | 3s loop   | translateY 0→-6px — empty state icon     |
| `countUp`      | 400ms     | Fade + translateY(8px) scale — stat values|
| `fadeIn`       | 150ms     | Legacy modal overlay (keep for compat)    |
| `slideUp`      | 220ms     | Legacy modal sheet (keep for compat)      |
| `spin`         | n/a loop  | Loading spinner                           |
| `pulse`        | 2s loop   | Opacity pulse (status dots)               |

---

## Animation by Interaction Type

### Navigation (tab switch)
CSS only. `key={active}` on `<main>` forces remount. Class `page-enter` on `<main>` triggers `pageEnter` keyframe.
No framer-motion needed here.

### List item enter
CSS stagger via `enter-fade` class + inline `animationDelay: ${i * 35}ms`.
No framer-motion needed for enter.

### List item exit (delete)
framer-motion `AnimatePresence` + `listItemVariants.exit`: slides left + fades in 160ms.

### Modal open
framer-motion: overlay fades in (150ms), sheet springs up from bottom (spring) or center variant on desktop.
Responsive: `window.innerWidth < 768` selects sheet vs center variant.

### Modal close
framer-motion `AnimatePresence` exit: sheet slides back down (200ms easeIn), overlay fades (150ms).

### Timer ring
CSS: `ringPulse` 4s infinite opacity animation when `running=true`.
CSS: `drop-shadow` filter on SVG wrapper, transition 600ms on filter.

### Timer play button
CSS: `transition: all var(--transition-bounce)` (200ms spring cubic). `:active` scales to 0.92.

### Checkbox / session dot completion
CSS: `dotPop` keyframe plays once on the newly-filled element. Triggered via `animation` style prop set on completion, cleared after 400ms via setTimeout.

### Heatmap bars
CSS: `heatmapGrow` with staggered `animationDelay` per bar (i × 60ms).

### Stat values
CSS: `countUp` keyframe on mount. Animated number via `useCountUp` hook (rAF-based).

### Hover lifts
CSS: `transform: translateY(-1px)` on `.task-card:hover`, `.btn-primary:hover`, `.btn-secondary:hover`.

### Empty state icon
CSS: `emptyFloat` 3s infinite loop on `.empty-state-icon`.

---

## Performance Rules

**Animate:** `opacity`, `transform` (translate, scale, rotate). These are compositor-layer properties and do not trigger layout.

**Do not animate:** `width`, `height`, `padding`, `margin`, `border-width`, `background` (except opacity/color when unavoidable). These trigger layout recalculation.

**`will-change`:** Add `will-change: transform` only to the timer play button (constant animation target). Do not add speculatively.

**SVG filter (glow):** Applied as `filter: drop-shadow(...)` on the SVG wrapper div, not as an SVG `filter` element. Safari handles drop-shadow on div elements correctly. Transition this over 600ms so the glow ramps smoothly when the timer starts/stops.

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This rule is placed **last** in `index.css` so it overrides all other animation declarations. framer-motion respects `prefers-reduced-motion` automatically when using the `useReducedMotion` hook — but since we're using CSS for most animations, the above handles both.
