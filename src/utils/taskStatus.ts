import type { TaskStatus } from "../types";
import { SLOT_DURATION_MINUTES } from "../constants";

export function getTaskStatus(
  timeSlot: string,
  date: string,
  now: Date
): TaskStatus {
  const slotStart = new Date(`${date}T${timeSlot}:00`);
  const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60000);

  if (now < slotStart) return "pending";
  if (now >= slotEnd) return "done";
  return "active";
}
