import { Stack } from "@mui/material";
import ColumnContainer from "./ColumnContainer";
import { useState } from "react";
import {
  DndContext,
  type DragStartEvent,
  type DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import JobCard from "./JobCard";

export interface Task {
  taskID: number;
  columnID: number;
  companyName: string;
  position: string;
  status: "Saved" | "Applied" | "Interviewing" | "Rejected" | "Offered";
  country: string;
  city?: string;
  appliedDate?: string;
}

const columns = [
  {
    id: 1,
    title: "Saved",
    color: "#e0e0e0",
  },
  {
    id: 2,
    title: "Applied",
    color: "#f8a83c ",
  },
  {
    id: 3,
    title: "Interviewing",
    color: "#65cdfe",
  },
  {
    id: 4,
    title: "Rejected",
    color: "#e2435b",
  },
  {
    id: 5,
    title: "Offered",
    color: "#02c575",
  },
];

export const tasksData: Task[] = [
  {
    taskID: 1,
    columnID: 1,
    companyName: "Microsoft",
    position: "Software Developer",
    country: "USA",
    status: "Saved",
  },
  {
    taskID: 2,
    columnID: 1,
    companyName: "Microsoft",
    position: "Backend Developer",
    country: "USA",
    status: "Saved",
  },
  {
    taskID: 3,
    columnID: 2,
    companyName: "Meta",
    position: "Software Engineer",
    status: "Applied",
    country: "USA",
    city: "San Francisco",
    appliedDate: "2023-10-01",
  },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(active.data.current?.task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as number;
    const overColumnId = over.id as number;

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.taskID === activeTaskId) {
          return {
            ...task,
            columnID: overColumnId,
            status: columns.find((col) => col.id === overColumnId)
              ?.title as Task["status"],
          };
        }
        return task;
      });
    });

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Stack direction="row" spacing={2} border="1px solid #02c575">
        {columns.map((col) => (
          <ColumnContainer
            column={col}
            key={col.title}
            tasks={tasks.filter((task) => task.columnID === col.id)}
          />
        ))}
      </Stack>

      {createPortal(
        <DragOverlay>
          {activeTask && <JobCard task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default KanbanBoard;
