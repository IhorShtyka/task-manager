import { useState } from "react";
import { css } from "../../styled-system/css";
import type { Task, TaskStatus } from "../types";
import { TaskCard } from "./TaskCard";
import { EmptySlot } from "./EmptySlot";
import { InlineForm } from "./InlineForm";
import { useTasksDispatch } from "../context/TaskContext";

interface TimeSlotProps {
  time: string; // "HH:MM"
  date: string; // "YYYY-MM-DD"
  task: Task | undefined;
  status: TaskStatus;
}

export function TimeSlot({ time, date, task, status }: TimeSlotProps) {
  const dispatch = useTasksDispatch();
  const [mode, setMode] = useState<"view" | "create" | "edit">("view");

  function handleCreate(title: string) {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: crypto.randomUUID(),
        title,
        date,
        timeSlot: time,
      },
    });
    setMode("view");
  }

  function handleEdit(title: string) {
    if (task) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { id: task.id, title },
      });
    }
    setMode("view");
  }

  function handleDelete() {
    if (task) {
      dispatch({ type: "DELETE_TASK", payload: task.id });
    }
  }

  const isActive = status === "active" && task;

  return (
    <div
      className={css({
        display: "flex",
        borderBottom: "1px solid #2a2a2a",
        py: "2",
        px: "4",
      })}
      style={{
        backgroundColor: isActive ? "#1a2a1a" : "transparent",
      }}
    >
      <span
        className={css({
          width: "65px",
          flexShrink: 0,
          pt: "1",
          fontSize: "sm",
        })}
        style={{
          color: isActive ? "#4ade80" : "#888",
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {time}
      </span>

      {mode === "create" && (
        <InlineForm onSave={handleCreate} onCancel={() => setMode("view")} />
      )}

      {mode === "edit" && task && (
        <InlineForm
          key={task.id}
          initialTitle={task.title}
          onSave={handleEdit}
          onCancel={() => setMode("view")}
        />
      )}

      {mode === "view" && task && (
        <TaskCard
          title={task.title}
          status={status}
          onEdit={() => setMode("edit")}
          onDelete={handleDelete}
        />
      )}

      {mode === "view" && !task && (
        <EmptySlot onClick={() => setMode("create")} />
      )}
    </div>
  );
}
