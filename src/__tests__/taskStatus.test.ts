import { describe, it, expect } from "vitest";
import { getTaskStatus } from "../utils/taskStatus";

describe("getTaskStatus", () => {
  const date = "2026-04-30";

  it("returns 'pending' when current time is before slot start", () => {
    const now = new Date("2026-04-30T08:59:00");
    expect(getTaskStatus("09:00", date, now)).toBe("pending");
  });

  it("returns 'active' when current time is at slot start", () => {
    const now = new Date("2026-04-30T09:00:00");
    expect(getTaskStatus("09:00", date, now)).toBe("active");
  });

  it("returns 'active' when current time is within slot", () => {
    const now = new Date("2026-04-30T09:15:00");
    expect(getTaskStatus("09:00", date, now)).toBe("active");
  });

  it("returns 'done' when current time is at slot end", () => {
    const now = new Date("2026-04-30T09:30:00");
    expect(getTaskStatus("09:00", date, now)).toBe("done");
  });

  it("returns 'done' when current time is after slot end", () => {
    const now = new Date("2026-04-30T10:00:00");
    expect(getTaskStatus("09:00", date, now)).toBe("done");
  });

  it("returns 'pending' when viewing a future date", () => {
    const now = new Date("2026-04-29T15:00:00");
    expect(getTaskStatus("09:00", date, now)).toBe("pending");
  });

  it("returns 'done' when viewing a past date", () => {
    const now = new Date("2026-05-01T08:00:00");
    expect(getTaskStatus("09:00", date, now)).toBe("done");
  });
});
