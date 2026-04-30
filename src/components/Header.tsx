import { css } from "../../styled-system/css";

interface HeaderProps {
  date: string; // "YYYY-MM-DD"
  now: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(now: Date): string {
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function Header({ date, now, onPrevDay, onNextDay, onToday }: HeaderProps) {
  return (
    <header
      className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "4",
        borderBottom: "2px solid #333",
      })}
    >
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <button
          onClick={onPrevDay}
          className={css({
            bg: "#333",
            border: "none",
            color: "#fff",
            px: "3",
            py: "1",
            borderRadius: "md",
            cursor: "pointer",
            _hover: { bg: "#444" },
          })}
        >
          &larr;
        </button>
        <h1 className={css({ fontSize: "xl", fontWeight: "bold", m: "0" })}>
          {formatDate(date)}
        </h1>
        <button
          onClick={onNextDay}
          className={css({
            bg: "#333",
            border: "none",
            color: "#fff",
            px: "3",
            py: "1",
            borderRadius: "md",
            cursor: "pointer",
            _hover: { bg: "#444" },
          })}
        >
          &rarr;
        </button>
      </div>
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <span className={css({ color: "#888", fontSize: "sm" })}>
          {formatTime(now)}
        </span>
        <button
          onClick={onToday}
          className={css({
            bg: "#4ade80",
            border: "none",
            color: "#000",
            px: "4",
            py: "1.5",
            borderRadius: "md",
            fontWeight: "bold",
            cursor: "pointer",
            _hover: { bg: "#22c55e" },
          })}
        >
          Today
        </button>
      </div>
    </header>
  );
}
