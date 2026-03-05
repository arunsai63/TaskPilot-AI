# Pomodoro Timer

## Files
- `src/components/Timer/Timer.jsx` — logic, controls, layout
- `src/components/Timer/TimerRing.jsx` — SVG progress ring
- `src/components/Timer/TimerSettings.jsx` — modal for settings
- `src/pages/TimerPage.jsx` — page wrapper

## Modes
```js
const MODES = [
  { key: 'focus',  label: 'Focus',       settingKey: 'focusDuration',      color: '--focus-color' },
  { key: 'short',  label: 'Short Break', settingKey: 'shortBreakDuration', color: '--break-color' },
  { key: 'long',   label: 'Long Break',  settingKey: 'longBreakDuration',  color: '--long-break-color' },
]
```

## State
| Variable | Purpose |
|----------|---------|
| modeIdx | current MODES index (0/1/2) |
| secondsLeft | countdown value |
| running | boolean — drives setInterval |
| completedFocusSessions | count since page load |
| selectedTaskId | optional task link |
| sessionStartTime | Date when session began |

## Tick loop
`useEffect` on `running`: starts/clears a 1-second `setInterval`. When `secondsLeft` hits 0, calls `handleSessionComplete` and clears itself.

## Session completion logic (`handleSessionComplete`)
1. Play beep if `soundEnabled` (Web Audio API — no files)
2. Send notification if `notificationsEnabled`
3. If focus: call `addSession`, increment `completedFocusSessions`, auto-advance to short/long break
4. If break: reset to focus mode
5. Auto-start next mode if `autoStartBreaks` / `autoStartFocus` is set

## TimerRing
SVG with `viewBox` + `width/height` attributes + `style={{ width:'100%', maxWidth:size, height:'auto' }}` — scales down on narrow screens. Progress ring uses `strokeDashoffset` on a `<circle>`.

## Settings (TimerSettings modal)
Edits a local copy of `timerSettings`, saves on confirm via `updateTimerSettings`. Fields: session label, focus/short/long durations (2-column grid), sessions before long break, 4 toggle switches.

## Web Audio beep
`playBeep(type)` — creates a fresh `AudioContext` per call, sine wave oscillator, gain ramp to silence in 0.8s. No cleanup needed (context GC'd after oscillator stops).
