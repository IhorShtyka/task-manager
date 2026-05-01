# Task Manager — Calendar Day View

A single-page task manager that displays a day as a vertical list of 30-minute time slots. Tasks appear as cards within their assigned slot, with status automatically determined by the current time.

## Features

- **Day view** — 18 time slots from 09:00 to 17:30 (30-minute intervals)
- **Auto status** — task status updates every 60 seconds based on the current clock:
  - `pending` — slot is in the future
  - `active` — current time is within the slot (highlighted with green glow)
  - `done` — slot is in the past (faded, strikethrough title)
- **Inline CRUD** — click an empty slot to create a task; click the edit icon to rename it; click the delete icon to remove it
- **Date navigation** — prev/next arrows and a Today button to switch days
- **Mock data** — 5 pre-seeded tasks for the current day on first load

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI and type safety |
| Vite | Build tool and dev server |
| Panda CSS | Build-time atomic CSS styling |
| Vitest + @testing-library/react | Unit and component tests |

## Getting Started

```bash
npm install
npx panda codegen
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Type-check and build for production
npm test          # Run tests once
npm run test:watch  # Run tests in watch mode
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Date navigation and current time display
│   ├── SlotList.tsx      # Renders all 18 time slots
│   ├── TimeSlot.tsx      # Single slot row with create/edit/view modes
│   ├── TaskCard.tsx      # Task display with status badge and actions
│   ├── EmptySlot.tsx     # Empty slot placeholder (click to add)
│   └── InlineForm.tsx    # Inline create/edit form
├── context/
│   └── TaskContext.tsx   # useReducer-based state with split contexts
├── data/
│   └── mockTasks.ts      # Pre-seeded sample tasks
├── hooks/
│   └── useCurrentTime.ts # Clock hook, refreshes every 60s
├── utils/
│   ├── taskStatus.ts     # getTaskStatus() — derives status from current time
│   └── dateUtils.ts      # getToday(), shiftDate() helpers
├── types.ts              # Task interface, TaskStatus type
└── constants.ts          # TIME_SLOTS array, SLOT_DURATION_MINUTES
```

## Architecture Notes

- **No backend** — all state lives in React memory, seeded with mock data on load
- **Status is derived, not stored** — `TaskStatus` is computed at render time from the current clock and the task's date/time slot; it is never persisted
- **State management** — `useReducer` with two separate contexts (state and dispatch) to avoid unnecessary re-renders in components that only dispatch
- **Styling** — Panda CSS generates atomic CSS classes at build time from static analysis of the source; run `npx panda codegen` after any style changes before building
