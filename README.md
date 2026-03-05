<div align="center">

<br/>

<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
  <rect width="72" height="72" rx="18" fill="url(#g)"/>
  <circle cx="36" cy="36" r="22" stroke="white" stroke-width="3" stroke-opacity="0.25"/>
  <circle cx="36" cy="36" r="22" stroke="white" stroke-width="3" stroke-dasharray="138.23" stroke-dashoffset="34.56" stroke-linecap="round" transform="rotate(-90 36 36)"/>
  <polygon points="31,28 31,44 47,36" fill="white" fill-opacity="0.92"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
      <stop stop-color="#9b8bc8"/>
      <stop offset="0.5" stop-color="#c09ad8"/>
      <stop offset="1" stop-color="#7868b8"/>
    </linearGradient>
  </defs>
</svg>

# TaskPilot

**A focused productivity app built for deep work — not distraction.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-9b8bc8?style=for-the-badge&logo=github)](https://arunsai63.github.io/TaskPilot-AI)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-5ba4cf?style=for-the-badge&logo=pwa&logoColor=white)](https://arunsai63.github.io/TaskPilot-AI)

<br/>

*No account. No sync. No data leaves your device.*

</div>

---

## What makes it different

Most productivity apps are bloated, subscription-gated, or require an account just to start a timer. TaskPilot is the opposite — a fully offline PWA that installs from your browser in one tap and works without internet, forever. Everything is stored locally. Close it, come back a week later, your streak and sessions are exactly where you left them.

The design is equally intentional. Instead of the generic indigo-on-white that every productivity SaaS copies, TaskPilot uses a hand-crafted **Kyoto Night** theme — wisteria glass surfaces, kinari cream text, and Japanese decorative elements (floating sakura petals, Mt. Fuji with torii gate, bamboo-ink heatmap bars) that make a utility app feel like it belongs in a design portfolio.

---

## Features

<table>
<tr>
<td width="50%" valign="top">

**Pomodoro Timer**

Animated SVG ring that glows and pulses while running — the remaining time is felt, not just read. Supports three configurable modes (Focus, Short Break, Long Break), auto-start sequences, Web Audio API beeps, browser push notifications, and a dot indicator that tracks sessions through the current cycle with a spring-pop animation on completion.

</td>
<td width="50%" valign="top">

**Task Management**

Create tasks before a session, set priority (high/medium/low with colour-coded left border glow), estimate pomodoro count, and track actual spent. Tasks link directly to timer sessions so every logged minute has context. Animated list entrance on add, exit animation on delete via `AnimatePresence`.

</td>
</tr>
<tr>
<td width="50%" valign="top">

**Free-form Focus Sessions**

Not everything fits in 25-minute blocks. The stopwatch mode logs any length of deep work to your daily total. The timer display glows wisteria purple while running, dims to neutral when paused — a subtle signal without noise.

</td>
<td width="50%" valign="top">

**Reminders**

Schedule one-off or repeating browser notifications (daily, weekdays, weekly). No calendar, no calendar sync, no permissions beyond `Notification`. Past reminders grey out automatically without any server clock involved.

</td>
</tr>
<tr>
<td width="50%" valign="top">

**Stats and Work Log**

Rolling 7-day bar chart with a grow-from-bottom entrance animation and a gradient highlight on today. Session history list. Streak tracking that resets correctly at midnight without a backend. Stat values animate from 0 on navigation using a cubic-ease rAF hook.

</td>
<td width="50%" valign="top">

**Installable PWA**

Full service worker, offline cache, and Web App Manifest. Installs from browser on mobile and desktop. An unobtrusive banner surfaces the install prompt at the right moment — after the user has actually used the app.

</td>
</tr>
</table>

---

## Technical highlights

```
React 19 + Vite 7       No build-time TypeScript overhead, instant HMR
framer-motion           Exit animations only — modals and list deletions.
                        All other motion is CSS (performance-first decision)
Web Audio API           Completion beeps without bundling an audio file
Notification API        Degraded gracefully — app is fully usable without permission
localStorage            Zero backend. All state serialised with a typed prefix layer
vite-plugin-pwa 1.2     Service worker + offline cache generated at build time
CSS custom properties   Complete design token system — zero hard-coded values in components
```

**Architecture decisions worth noting:**

- All framer-motion variant objects live in one file (`src/utils/animations.js`) — components never define motion config inline
- A `useCountUp` hook drives stat number animations using `requestAnimationFrame` with cubic-ease, keeping the animation off the React render cycle
- CSS vars don't resolve inside SVG `drop-shadow` filter strings (Safari limitation) — timer glow uses a hardcoded `MODE_GLOW` map of rgba values instead
- The `--toggle-accent` CSS custom property override pattern lets a single `.toggle` class produce warning-coloured toggles in reminder cards without a modifier class

---

## Design system — Kyoto Night

The entire visual language is documented in [`docs/design-system.md`](docs/design-system.md).

| Layer | Value | Reference |
|---|---|---|
| Background | `#0a0c10` | Deep ink (墨) |
| Surface | `rgba(16,19,28,0.78)` + `blur(16px)` | Washi paper translucency |
| Accent | `#9b8bc8` | Fuji/wisteria purple (藤色) |
| Text | `#e4ddd0` | Kinari cream (生成り) — raw silk |
| Warning | `#d4a870` | Gold lacquer (金色) |
| Danger | `#c47880` | Beni crimson (紅色) |
| Fonts | DM Sans + DM Mono | — |

Body background has a 2.5%-opacity wisteria dot grid (28px pitch) that evokes washi paper grain. Borders carry a warm violet tint (`rgba(220,200,245,0.07)`) rather than cold white alpha, which is the single biggest detail that separates this from generic dark UIs.

---

## Roadmap

**Near-term**

- [ ] Chrome Built-in AI integration — on-device summarisation of completed sessions ("You focused on X for 3h today, completed Y tasks") with zero API cost and full privacy via the [Prompt API](https://developer.chrome.com/docs/ai/built-in)
- [ ] Task tagging and tag-based session filtering
- [ ] Keyboard shortcuts for timer controls

**Later**

- [ ] Optional iCloud / Google Drive sync (user-supplied, no server)
- [ ] Weekly review mode — AI-generated insight from your own work log data
- [ ] Ambient sound player (rain, white noise, brown noise) with timer integration
- [ ] Apple Watch / Wear OS companion notification via Web Bluetooth

---

## Local development

```bash
git clone https://github.com/arunsai63/TaskPilot-AI.git
cd TaskPilot-AI
npm install
npm run dev
```

Production build deploys automatically to GitHub Pages on every push to `main` via GitHub Actions. Manual deploy: `npm run deploy`.

---

## Project structure

```
src/
  context/AppContext.jsx     Global state — tasks, sessions, reminders, workLog, stats
  hooks/
    useLocalStorage.js       useState + localStorage bidirectional sync
    useCountUp.js            rAF cubic-ease count-up for animated stat values
    useNotifications.js      Notification API with permission state
  utils/
    animations.js            All framer-motion variant objects (centralised)
    format.js                formatTime, formatDuration, generateId, getDayKey
    storage.js               Typed get/set with taskpilot_ prefix + JSON safety
  components/
    Timer/                   TimerRing (SVG), Timer (logic + state), TimerSettings (modal)
    Tasks/                   TaskCard, TaskForm
    Focus/                   FocusSession (free-form stopwatch)
    Reminders/               ReminderCard, ReminderForm
    Stats/                   StatsPanel (heatmap + count-up stats + session log)
    SakuraBranch.jsx         Shared decorative SVG — empty states
  pages/                     Thin wrappers, one per nav tab
docs/
  design-system.md           Full token reference — colours, fonts, shadows, glass surfaces
  animations.md              Animation system — variants, durations, CSS keyframes
```

---

<div align="center">

Built with React 19, Vite 7, framer-motion, and the Kyoto Night design system.

</div>
