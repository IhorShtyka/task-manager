import { TIME_SLOTS } from "../constants";
import { useTasks } from "../context/TaskContext";
import { getTaskStatus } from "../utils/taskStatus";
import { TimeSlot } from "./TimeSlot";

interface SlotListProps {
  date: string; // "YYYY-MM-DD"
  now: Date;
}

export function SlotList({ date, now }: SlotListProps) {
  const tasks = useTasks();
  const dayTasks = tasks.filter((t) => t.date === date);

  return (
    <div>
      {TIME_SLOTS.map((time) => {
        const task = dayTasks.find((t) => t.timeSlot === time);
        const status = getTaskStatus(time, date, now);
        return (
          <TimeSlot
            key={time}
            time={time}
            date={date}
            task={task}
            status={status}
          />
        );
      })}
    </div>
  );
}
