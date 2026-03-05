# TaskPilot

A focused productivity tool that keeps your work sessions intentional and your progress visible. Built as a fully offline-capable PWA — no account, no sync, no friction.

**Live:** https://arunsai63.github.io/TaskPilot-AI

---

## What it does

**Pomodoro Timer**
Customisable work and break intervals with an animated ring that makes the remaining time feel tangible rather than just a number. Supports auto-start sequences, sound alerts, and browser notifications so you can work without watching the clock.

**Task Management**
Create and prioritise tasks before a session starts. Tag them, set due dates, estimate how many pomodoros they will take, and track how many you have actually spent. Tasks link directly to timer sessions so your log is accurate.

**Free-form Focus Sessions**
Not everything fits in 25-minute blocks. The stopwatch mode lets you track long, uninterrupted stretches of deep work and still logs them to your daily total.

**Reminders**
Schedule one-off or repeating browser notifications for anything outside of active work — standups, reviews, end-of-day wrap-ups. No calendar required.

**Stats and Work Log**
A rolling 7-day bar chart shows your actual output at a glance. Session history, total focus time, and streak data are all visible in a single view. Everything resets correctly at midnight without any server involvement.

---

## Design decisions

- All state lives in `localStorage`. There is no backend, no login, and no data leaves the device.
- Installable as a PWA on any device via the browser's native install prompt.
- Timer state survives page reloads. Active sessions are preserved across navigation.
- The notification system degrades gracefully — the app works fully without permission.

---

## Local development

```bash
npm install
npm run dev
```

Deployed automatically to GitHub Pages on every push to `main`.
