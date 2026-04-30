export const SLOT_DURATION_MINUTES = 30;

export const TIME_SLOTS: string[] = [];

for (let hour = 9; hour < 18; hour++) {
  for (let min = 0; min < 60; min += SLOT_DURATION_MINUTES) {
    const hh = String(hour).padStart(2, "0");
    const mm = String(min).padStart(2, "0");
    TIME_SLOTS.push(`${hh}:${mm}`);
  }
}
