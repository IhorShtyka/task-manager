import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { Task } from "../types";
import { createMockTasks } from "../data/mockTasks";

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; title: string } }
  | { type: "DELETE_TASK"; payload: string };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK": {
      const exists = state.some(
        (t) =>
          t.timeSlot === action.payload.timeSlot &&
          t.date === action.payload.date
      );
      if (exists) return state;
      return [...state, action.payload];
    }
    case "UPDATE_TASK":
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, title: action.payload.title }
          : t
      );
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const TasksContext = createContext<Task[]>([]);
const TasksDispatchContext = createContext<Dispatch<TaskAction>>(() => {});

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, getToday(), createMockTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
