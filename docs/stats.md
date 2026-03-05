# Stats

## Files
- `src/pages/StatsPage.jsx` — page wrapper
- `src/components/Stats/StatsPanel.jsx` — all stat widgets

## Widgets

### Stat cards (2-column grid)
- Today's Focus: `workLog[today]` in minutes → `formatDuration`
- Today's Sessions: count of sessions where `completedAt` starts with today's key and `type === 'focus'`
- Streak: `stats.streak` in days
- Total Focus: `stats.totalFocusMinutes` → `formatDuration`

### Week heatmap
7-day bar chart (last 7 days, oldest left). Bar height proportional to minutes, minimum 4px visual height for zero days. Today highlighted with full opacity and accent-coloured label.

### Recent sessions
Last 8 sessions from `sessions` array (most recent at index 0). Shows type dot, label, duration (minutes), time of day.

## Stats accumulation (AppContext)
`addSession` is the single write path:
1. Appends to `sessions`
2. For `type === 'focus'`: adds `duration` to `workLog[today]` and `stats.totalFocusMinutes`, increments `stats.totalSessions`
3. Updates `stats.streak` and `stats.lastActiveDay` via `getDayKey()`

Streak logic: if `lastActiveDay` is yesterday → increment, if today → keep, otherwise reset to 1.
