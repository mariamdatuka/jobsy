import { Stack } from "@mui/material";
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
import { arrayMove } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import JobCard from "./JobCard";
import { columns } from "@src/helpers/constanst";
import type { Task } from "@src/types/commonTypes";

export const tasksData: Task[] = [
  {
    taskID: 1,
    company_name: "Microsoft",
    position: "Software Developer",
    country: "USA",
    status: "SAVED",
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
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const activeId = active.id as number;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    // Dropping task over another task (reordering within same column or moving to different column)
    if (isActiveTask && isOverTask) {
      const overId = over.id as number;
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskID === activeId);
        const overIndex = tasks.findIndex((t) => t.taskID === overId);

        // If tasks are in the same column, just reorder them
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];

        activeTask.status = overTask.status;

        return arrayMove(tasks, activeIndex, overIndex);

        // if (activeTask.status === overTask.status) {
        //   return arrayMove(tasks, activeIndex, overIndex);
        // } else {
        //   // Moving to different column - update status and reorder
        //   const newTasks = tasks.map((task) =>
        //     task.taskID === activeId
        //       ? { ...task, status: overTask.status }
        //       : task
        //   );
        //   const newActiveIndex = newTasks.findIndex(
        //     (t) => t.taskID === activeId
        //   );
        //   const newOverIndex = newTasks.findIndex((t) => t.taskID === overId);
        //   return arrayMove(newTasks, newActiveIndex, newOverIndex);
        // }
      });
    }

    const isOverColumn = over.data.current?.type === "column";
    if (isActiveTask && isOverColumn) {
      const overId = over.id as Task["status"];
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskID === activeId);
        tasks[activeIndex].status = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
    // Dropping task over a column (moving to different column)
    // else if (isActiveTask && !isOverTask) {
    //   const overId = over.id as Task["status"]; // When over a column, over.id is the status
    //   setTasks((tasks) =>
    //     tasks.map((task) =>
    //       task.taskID === activeId ? { ...task, status: overId } : task
    //     )
    //   );
    // }
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
            tasks={tasks.filter((task) => task.status === col.id)}
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
