# TaskPilot — Agent Instructions

## Identity and authorship
- Commits as: `arunsai63 <arunsai63@users.noreply.github.com>`
- No AI attribution anywhere — not in commits, code comments, UI copy, or docs
- No emojis, ever

---

## Agentic behaviour

### Before touching anything
Read before writing. Understand the existing pattern before proposing a new one. If two files implement similar things differently, ask which convention to follow — do not invent a third.

### Minimal footprint
Do not create files, abstractions, or utilities speculatively. A function that is used once should not exist. An abstraction earns its place when it is genuinely reused, not when it might be.

### Reversibility check
Before any destructive operation (delete, overwrite, rename across files, schema change), state what will be lost and confirm intent. Exceptions: deleting `console.log` statements, unused imports, dead code the user asked to remove.

### Task decomposition
For multi-step work, state the plan before executing it. For anything touching more than three files, enumerate the changes. Do not start a chain of edits that cannot be safely abandoned halfway.

### When to stop and ask
- The requirement is genuinely ambiguous and two interpretations would produce different architectures
- A change will affect something outside the stated scope
- The existing code contradicts the instruction (surface the conflict, do not silently pick one)

Do not ask about things that are clearly inferable from context. Over-confirmation is noise.

---

## Code standards

### No over-engineering
The right solution is the simplest one that handles the real cases. Do not add:
- Error handling for things that cannot fail
- Configuration flags for decisions that will never change
- Abstractions for one-time use
- Comments that restate what the code already says clearly

### State management
All persistent state lives in `localStorage` via `useLocalStorage`. The `storage.js` util handles the `taskpilot_` prefix and JSON parsing. Do not bypass it with direct `localStorage` calls. Do not introduce external state libraries.

### Component boundaries
UI components do not own business logic. Logic lives in context or hooks. A component that fetches, transforms, and renders data is doing too many things.

### CSS
Custom properties only — defined in `index.css`. No inline style objects for design decisions (spacing rhythm, colours, radii). Inline styles are acceptable for dynamic values only (widths driven by state, conditional colours, animation progress).

---

## Project map

```
src/
  context/AppContext.jsx     global state — tasks, sessions, reminders, workLog, stats, timerSettings
  hooks/
    useLocalStorage.js       useState + localStorage sync
    useNotifications.js      Notification API wrapper with permission state
  utils/
    storage.js               raw get/set with prefix and JSON safety
    format.js                formatTime, formatDuration, generateId, getDayKey, isOverdue
  components/
    Timer/                   TimerRing (SVG), Timer (logic), TimerSettings (modal)
    Tasks/                   TaskCard, TaskForm
    Focus/                   FocusSession (free-form stopwatch)
    Reminders/               ReminderCard, ReminderForm
    Stats/                   StatsPanel (heatmap + session log)
  pages/                     thin wrappers — one per nav tab
```

---

## Data shapes

```js
// Task
{ id, title, description, priority: 'high'|'medium'|'low',
  status: 'todo'|'in_progress'|'done', dueDate, estimatedPomodoros,
  completedPomodoros, tags: [], createdAt }

// Session
{ id, type: 'focus'|'short_break'|'long_break', duration, taskId, label, completedAt }

// Reminder
{ id, title, time, repeat: 'none'|'daily'|'weekdays'|'weekly', note, enabled, createdAt }

// workLog: { 'YYYY-MM-DD': minutes }
// stats: { totalFocusMinutes, totalSessions, streak, lastActiveDay }
// timerSettings: { focusDuration, shortBreakDuration, longBreakDuration,
//                  sessionsBeforeLongBreak, autoStartBreaks, autoStartFocus,
//                  soundEnabled, notificationsEnabled, sessionLabel }
```

---

## Deployment

- Base path: `/TaskPilot-AI/` — required in `vite.config.js` and all absolute asset references
- GitHub Actions deploys on every push to `main` using `actions/deploy-pages`
- PWA via `vite-plugin-pwa` 1.2.0 — do not downgrade (0.x versions do not exist for this vite version)
- Icons: `logo.svg` (source), `pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`, `favicon.ico`
- Manual deploy: `npm run deploy` (gh-pages package, fallback only)
