import { useState } from "react";
import { css } from "../styled-system/css";
import { TaskProvider } from "./context/TaskContext";
import { useCurrentTime } from "./hooks/useCurrentTime";
import { Header } from "./components/Header";
import { SlotList } from "./components/SlotList";
import { getToday, shiftDate } from "./utils/dateUtils";

function AppContent() {
  const now = useCurrentTime();
  const [selectedDate, setSelectedDate] = useState(getToday);

  return (
    <div
      className={css({
        minHeight: "100vh",
        bg: "#121212",
        color: "#e0e0e0",
        maxWidth: "800px",
        mx: "auto",
      })}
    >
      <Header
        date={selectedDate}
        now={now}
        onPrevDay={() => setSelectedDate((d) => shiftDate(d, -1))}
        onNextDay={() => setSelectedDate((d) => shiftDate(d, 1))}
        onToday={() => setSelectedDate(getToday())}
      />
      <SlotList date={selectedDate} now={now} />
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
