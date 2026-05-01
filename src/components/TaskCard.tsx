import { css } from "../../styled-system/css";
import type { TaskStatus } from "../types";

const STATUS_STYLES: Record<
  TaskStatus,
  { border: string; bg: string; badge: string }
> = {
  pending: { border: "#facc15", bg: "#3a3a2a", badge: "#facc15" },
  active: { border: "#4ade80", bg: "#2a4a3a", badge: "#4ade80" },
  done: { border: "#60a5fa", bg: "#2a2a4a", badge: "#60a5fa" },
};

interface TaskCardProps {
  title: string;
  status: TaskStatus;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ title, status, onEdit, onDelete }: TaskCardProps) {
  const styles = STATUS_STYLES[status];

  return (
    <div
      className={css({
        flex: "1",
        p: "2",
        borderRadius: "md",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      })}
      style={{
        backgroundColor: styles.bg,
        borderLeft: `3px solid ${styles.border}`,
        opacity: status === "done" ? 0.7 : 1,
        boxShadow: status === "active" ? `0 0 8px ${styles.border}33` : "none",
      }}
    >
      <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
        <strong
          className={css({ color: "#e0e0e0" })}
          style={{
            textDecoration: status === "done" ? "line-through" : "none",
          }}
        >
          {title}
        </strong>
        <span
          className={css({
            fontSize: "xs",
            px: "2",
            py: "0.5",
            borderRadius: "full",
            color: "#000",
          })}
          style={{ backgroundColor: styles.badge }}
        >
          {status}
        </span>
        {status === "active" && (
          <span className={css({ color: "#4ade80", fontSize: "xs" })}>
            ● now
          </span>
        )}
      </div>
      <div className={css({ display: "flex", gap: "3" })}>
        <button
          onClick={onEdit}
          className={css({
            bg: "transparent",
            border: "none",
            color: "#888",
            cursor: "pointer",
            fontSize: "sm",
            borderRadius: "full",
            _hover: { opacity: 0.7 },
          })}
          aria-label="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className={css({
            bg: "transparent",
            border: "none",
            color: "#888",
            cursor: "pointer",
            fontSize: "sm",
            borderRadius: "full",
            _hover: { opacity: 0.7 },
          })}
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
