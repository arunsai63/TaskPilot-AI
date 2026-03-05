# TaskPilot AI - Project Rules

## Rules
- No emojis ever in code, comments, or commit messages
- No Claude/AI attribution in code, commits, or UI
- Git username: arunsai63

## Stack
- Vite + React (no TypeScript)
- LocalStorage only (no backend)
- PWA via vite-plugin-pwa
- Lucide React for icons
- No UI component libraries - custom CSS variables only

## Architecture
- `src/context/AppContext.jsx` - all state (tasks, sessions, reminders, workLog, stats, timerSettings)
- `src/hooks/useLocalStorage.js` - localStorage persistence
- `src/utils/storage.js` - raw localStorage with prefix `taskpilot_`
- `src/utils/format.js` - formatTime, formatDuration, generateId, getDayKey

## Features
- Pomodoro timer (customizable durations, sounds, notifications, auto-start)
- Task management (priority, due dates, pomodoro estimates, tags, status)
- Free-form focus sessions (stopwatch, saves to work log)
- Reminders (browser notifications, repeat options)
- Stats (daily/weekly work log heatmap, session history, streaks)

## Deployment
- `npm run deploy` - deploys to GitHub Pages (gh-pages branch)
- Base URL: `/TaskPilot-AI/`
- GitHub repo: arunsai63/TaskPilot-AI
