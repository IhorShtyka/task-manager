import { describe, it, expect } from "vitest";
import { taskReducer } from "../context/TaskContext";
import type { Task } from "../types";

const task1: Task = {
  id: "1",
  title: "Standup",
  date: "2026-04-30",
  timeSlot: "09:00",
};

describe("taskReducer", () => {
  it("adds a task with ADD_TASK", () => {
    const state: Task[] = [];
    const result = taskReducer(state, { type: "ADD_TASK", payload: task1 });
    expect(result).toEqual([task1]);
  });

  it("does not add a task if slot is already taken on the same date", () => {
    const state: Task[] = [task1];
    const duplicate: Task = { ...task1, id: "2", title: "Other" };
    const result = taskReducer(state, { type: "ADD_TASK", payload: duplicate });
    expect(result).toEqual([task1]);
  });

  it("updates a task title with UPDATE_TASK", () => {
    const state: Task[] = [task1];
    const result = taskReducer(state, {
      type: "UPDATE_TASK",
      payload: { id: "1", title: "Daily standup" },
    });
    expect(result[0].title).toBe("Daily standup");
  });

  it("removes a task with DELETE_TASK", () => {
    const state: Task[] = [task1];
    const result = taskReducer(state, { type: "DELETE_TASK", payload: "1" });
    expect(result).toEqual([]);
  });

  it("returns state unchanged for unknown action", () => {
    const state: Task[] = [task1];
    const result = taskReducer(state, { type: "UNKNOWN" as any, payload: null });
    expect(result).toBe(state);
  });
});
