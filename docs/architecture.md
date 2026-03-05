# Architecture

## Stack
- Vite 7 + React 19 (no TypeScript)
- lucide-react for icons
- vite-plugin-pwa 1.2.0 for service worker
- No UI library, no state library

## File structure
```
src/
  context/AppContext.jsx     single global provider — all state lives here
  hooks/
    useLocalStorage.js       useState synced to localStorage
    useNotifications.js      Notification API + permission state
  utils/
    storage.js               get/set with taskpilot_ prefix + JSON safety
    format.js                formatTime, formatDuration, generateId, getDayKey, isOverdue, formatDate, formatDateTime
  components/
    Timer/                   TimerRing.jsx, Timer.jsx, TimerSettings.jsx
    Tasks/                   TaskCard.jsx, TaskForm.jsx
    Focus/                   FocusSession.jsx
    Reminders/               ReminderCard.jsx, ReminderForm.jsx
    Stats/                   StatsPanel.jsx
  pages/                     one thin wrapper per nav tab
  index.css                  all CSS — variables, utilities, components, responsive
  App.jsx                    AppShell, InstallPrompt, nav
  main.jsx                   ReactDOM.createRoot
```

## State (AppContext)
All state uses `useLocalStorage`. Keys:
| State key | localStorage key | Type |
|-----------|-----------------|------|
| tasks | taskpilot_tasks | Task[] |
| sessions | taskpilot_sessions | Session[] |
| reminders | taskpilot_reminders | Reminder[] |
| workLog | taskpilot_workLog | Record<'YYYY-MM-DD', minutes> |
| stats | taskpilot_stats | StatsShape |
| timerSettings | taskpilot_timerSettings | TimerSettings |

## Data shapes
```js
Task: { id, title, description, priority: 'high'|'medium'|'low',
        status: 'todo'|'in_progress'|'done', dueDate, estimatedPomodoros,
        completedPomodoros, tags: [], createdAt }

Session: { id, type: 'focus'|'short_break'|'long_break',
           duration, taskId, label, completedAt }

Reminder: { id, title, time, repeat: 'none'|'daily'|'weekdays'|'weekly',
            note, enabled, createdAt }

workLog: { 'YYYY-MM-DD': minutes }

stats: { totalFocusMinutes, totalSessions, streak, lastActiveDay }

timerSettings: { focusDuration, shortBreakDuration, longBreakDuration,
                 sessionsBeforeLongBreak, autoStartBreaks, autoStartFocus,
                 soundEnabled, notificationsEnabled, sessionLabel }
```

## Navigation
- Mobile: fixed bottom nav (`.bottom-nav`) with 5 tabs — icon + label
- Desktop (≥768px): top nav in header (`.desktop-nav`)
- Active page rendered by `AppShell` via `useState('timer')`
- No router — single-page tab switching
