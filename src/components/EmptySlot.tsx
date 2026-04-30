import { css } from "../../styled-system/css";

interface EmptySlotProps {
  onClick: () => void;
}

export function EmptySlot({ onClick }: EmptySlotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={css({
        flex: "1",
        border: "1px dashed #333",
        bg: "transparent",
        p: "2",
        borderRadius: "md",
        color: "#555",
        fontSize: "sm",
        cursor: "pointer",
        textAlign: "left",
        _hover: { borderColor: "#555", color: "#888" },
      })}
    >
      + Click to add task
    </button>
  );
}
