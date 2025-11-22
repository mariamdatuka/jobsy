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
  type DragCancelEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import JobCard from "./JobCard";
import { arrayMove } from "@dnd-kit/sortable";

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
    title: "saved",
    color: "#e0e0e0",
  },
  {
    id: 2,
    title: "applied",
    color: "#f8a83c ",
  },
  {
    id: 3,
    title: "interviewing",
    color: "#65cdfe",
  },
  {
    id: 4,
    title: "rejected",
    color: "#e2435b",
  },
  {
    id: 5,
    title: "offered",
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
    columnID: 1,
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

  // const handleDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;

  //   if (!over) return;

  //   const activeTaskId = active.id as number;
  //   const overId = over.id as number;
  //   if (activeTaskId === overId) return;

  //   const isActiveTask = active.data.current?.type === "task";
  //   const isOverTask = over.data.current?.type === "task";
  //   const isOverColumn = over.data.current?.type === "column";

  //   if (!isActiveTask) return;

  //   // Update columnID during drag for visual feedback
  //   if (isOverTask && isOverColumn) {
  //     setTasks((prevTasks) => {
  //       const activeTask = prevTasks.find((t) => t.taskID === activeTaskId);
  //       if (!activeTask) return prevTasks;

  //       let targetColumnId: number | null = null;

  //       if (isOverTask) {
  //         const overTask = prevTasks.find((t) => t.taskID === overId);
  //         if (overTask && activeTask.columnID !== overTask.columnID) {
  //           targetColumnId = overTask.columnID;
  //         }
  //       } else if (isOverColumn) {
  //         if (activeTask.columnID !== overId) {
  //           targetColumnId = overId;
  //         }
  //       }

  //       if (targetColumnId !== null) {
  //         return prevTasks.map((task) => {
  //           if (task.taskID === activeTaskId) {
  //             return {
  //               ...task,
  //               columnID: targetColumnId,
  //             };
  //           }
  //           return task;
  //         });
  //       }

  //       return prevTasks;
  //     });
  //   }
  // };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    setTasks((items) => {
      const oldIndex = items.findIndex((i) => i.taskID === active.id);
      const newIndex = items.findIndex((i) => i.taskID === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    void event;
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      // onDragOver={handleDragOver}
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
