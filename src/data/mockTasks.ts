import type { Task } from "../types";

export function createMockTasks(today: string): Task[] {
  return [
    { id: "mock-1", title: "Team standup", date: today, timeSlot: "09:00" },
    { id: "mock-2", title: "Code review", date: today, timeSlot: "10:00" },
    { id: "mock-3", title: "Write documentation", date: today, timeSlot: "11:30" },
    { id: "mock-4", title: "Lunch break", date: today, timeSlot: "13:00" },
    { id: "mock-5", title: "Sprint planning", date: today, timeSlot: "15:00" },
  ];
}
