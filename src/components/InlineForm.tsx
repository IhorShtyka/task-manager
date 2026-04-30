import { useState } from "react";
import { css } from "../../styled-system/css";

interface InlineFormProps {
  initialTitle?: string;
  onSave: (title: string) => void;
  onCancel: () => void;
}

export function InlineForm({ initialTitle = "", onSave, onCancel }: InlineFormProps) {
  const [title, setTitle] = useState(initialTitle);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) onSave(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={css({
        flex: "1",
        bg: "#1e1e2e",
        border: "1px solid #4ade80",
        p: "2.5",
        borderRadius: "md",
      })}
    >
      <div
        className={css({
          fontSize: "xs",
          color: "#4ade80",
          mb: "1.5",
        })}
      >
        {initialTitle ? "Edit task" : "New task"}
      </div>
      <div className={css({ display: "flex", gap: "1.5", alignItems: "center" })}>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className={css({
            flex: "1",
            bg: "#2a2a3a",
            border: "1px solid #444",
            color: "#e0e0e0",
            px: "2",
            py: "1.5",
            borderRadius: "md",
            outline: "none",
            _focus: { borderColor: "#4ade80" },
          })}
        />
        <button
          type="submit"
          className={css({
            bg: "#4ade80",
            border: "none",
            color: "#000",
            px: "3",
            py: "1.5",
            borderRadius: "md",
            fontSize: "sm",
            cursor: "pointer",
            _hover: { bg: "#22c55e" },
          })}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={css({
            bg: "#333",
            border: "none",
            color: "#aaa",
            px: "3",
            py: "1.5",
            borderRadius: "md",
            fontSize: "sm",
            cursor: "pointer",
            _hover: { bg: "#444" },
          })}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
