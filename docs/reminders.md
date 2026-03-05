# Reminders

## Files
- `src/pages/RemindersPage.jsx` — list, notification permission banner
- `src/components/Reminders/ReminderCard.jsx` — single reminder row
- `src/components/Reminders/ReminderForm.jsx` — create/edit modal

## Data
```js
{ id, title, time: ISO string, repeat: 'none'|'daily'|'weekdays'|'weekly',
  note, enabled: boolean, createdAt }
```

## Notification polling
`RemindersPage` runs a `setInterval` every 30s when permission is `granted`. For each enabled reminder, if `Math.abs(now - reminderTime) < 30s`, fires `notify(title, { body: note })`. Rough matching — not millisecond-precise.

## Sections
Reminders split into `upcoming` (time ≥ now, sorted ascending) and `past` (time < now or no time). Empty state shown when list is empty.

## Repeat field
`repeat` is stored but not used in the current notification polling logic — it stores user intent for a future recurring implementation.

## Context actions
`addReminder(data)`, `updateReminder(id, partial)`, `deleteReminder(id)`
