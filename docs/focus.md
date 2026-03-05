# Focus Session

## Files
- `src/pages/FocusPage.jsx` — page wrapper with padding
- `src/components/Focus/FocusSession.jsx` — stopwatch + session save

## Behaviour
Free-form stopwatch — no fixed duration. User sets a label and optionally links a task before starting.

- Start: records `Date.now()` in `startRef`, runs 1s interval updating `elapsed` (seconds)
- Stop: if elapsed ≥ 60s, calls `addSession({ type:'focus', duration: Math.floor(elapsed/60), ... })`; sessions under 1 minute are discarded
- Display: `MM:SS` or `HH:MM:SS` when elapsed ≥ 1 hour
- Pre-start inputs (label, task select, goal) are hidden while running

## Today's total
Reads `workLog[getDayKey()]` — updated by `addSession` in AppContext, which accumulates minutes into `workLog` and recalculates `stats`.
