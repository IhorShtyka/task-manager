# Task Manager — Calendar Day View

## Overview

A single-page task manager displaying a day as a vertical list of 30-minute time slots (09:00–18:00). Tasks appear as cards within their assigned slot. Task status is automatically computed from the current time.

## Tech Stack

- React 19, TypeScript, Vite
- Panda CSS (styling)
- Vitest (unit tests)

No router, no backend, no external state management. React `useReducer` + context for state. Mock data pre-populated.

## Data Model

```ts
interface Task {
  id: string;
  title: string;
  date: string;      // "YYYY-MM-DD"
  timeSlot: string;   // "09:00", "09:30", etc.
}

type TaskStatus = "pending" | "active" | "done";
```

- `TaskStatus` is **not stored** — it's derived at render time by comparing `now` to the task's slot.
- One task per slot per day.

## Auto Status Logic

Given `now` (current time) and a task at slot `HH:MM` (duration 30 min):

| Condition | Status |
|-----------|--------|
| `now < slotStart` | pending |
| `slotStart <= now < slotEnd` | active |
| `now >= slotEnd` | done |

- Recalculated every 60 seconds via `setInterval`.
- Recalculated immediately on any CRUD operation.

## UI Layout

### Header
- Date display (e.g., "April 30, 2026")
- Prev/Next day arrows
- "Today" button to jump to current date
- Current time indicator

### Slot List (vertical)
Each row:
```
[HH:MM]  [Task Card | Empty Slot]
```

**Task Card** shows:
- Title
- Status badge (color-coded): pending (yellow), active (green), done (blue)
- Edit and Delete action icons
- Active slot gets a highlight/glow effect
- Done tasks get opacity reduction + strikethrough title

**Empty Slot** shows:
- Dashed border with "+ Click to add task" text
- Clicking opens inline create form

### Inline Form (create & edit)
- Appears in-place within the slot
- Single text input for title (pre-filled when editing)
- Save and Cancel buttons
- No status selector (status is automatic)

## Component Structure

```
App
├── Header (date nav, today button, current time)
└── SlotList
    └── TimeSlot (×18, one per 30-min slot)
        ├── TaskCard (if task exists)
        │   ├── status badge
        │   ├── edit button → switches to InlineForm
        │   └── delete button
        ├── EmptySlot (if no task) → click switches to InlineForm
        └── InlineForm (create/edit mode)
```

## State Management

- `useReducer` with actions: `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`
- Context provider wraps `App` to share task state + dispatch
- `currentTime` state updated every 60s via `useEffect` + `setInterval`
- Status derived at render: `getTaskStatus(task, currentTime)`

## Mock Data

Pre-populated tasks for today's date covering a few slots to demonstrate all three statuses.

## Interactions

1. **Create**: Click empty slot → inline form appears → type title → Save → task added to slot
2. **Edit**: Click edit icon on task card → card becomes inline form with title pre-filled → modify → Save
3. **Delete**: Click delete icon → task removed (no confirmation needed for simplicity)
4. **Navigate days**: Prev/Next arrows change the displayed date; Today button returns to current date

## Color Scheme

| Status | Border/Badge | Background |
|--------|-------------|------------|
| pending | `#facc15` (yellow) | `#3a3a2a` |
| active | `#4ade80` (green) | `#2a4a3a` |
| done | `#60a5fa` (blue) | `#2a2a4a` |

Dark theme overall. Active slot gets subtle glow (`box-shadow`).

## Testing

- **Unit tests (Vitest)**: `getTaskStatus()` logic, reducer actions, component rendering
- Test status transitions at boundary times
- Test CRUD operations via reducer
