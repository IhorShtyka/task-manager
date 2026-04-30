export interface Task {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  timeSlot: string; // "HH:MM" e.g. "09:00"
}

export type TaskStatus = "pending" | "active" | "done";
