# Tasks

## Files
- `src/pages/TasksPage.jsx` — list, search, filter, sort
- `src/components/Tasks/TaskCard.jsx` — single task row
- `src/components/Tasks/TaskForm.jsx` — create/edit modal

## TasksPage
- Filter by status: all / todo / in_progress / done
- Search: title, description, tags (case-insensitive substring)
- Sort: newest (createdAt default) / priority / due date
- Counts badge: todo · active · done

## TaskCard
- Priority colour via left border (`--danger` / `--warning` / `--success`)
- Inline checkbox toggles status between `todo` and `done`
- Expand/collapse for description and status selector
- Overdue detection: `isOverdue(dueDate) && status !== 'done'`
- Pomodoro counter shown as `completedPomodoros/estimatedPomodoros`

## TaskForm (modal)
Fields: title (required), description (textarea), priority select, estimated pomodoros, due date, tags (comma-separated string → array on save). Reused for both create and edit — distinguished by presence of `task` prop.

## Context actions
| Action | Signature |
|--------|-----------|
| addTask | (data) — generates id, timestamps |
| updateTask | (id, partial) |
| deleteTask | (id) |

Pomodoro increment: Timer calls `updateTask` to bump `completedPomodoros` when a session completes with a linked task.
