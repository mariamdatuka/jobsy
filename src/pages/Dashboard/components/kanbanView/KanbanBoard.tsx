import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
import { useTasks } from "@src/hooks/useTasks";
import { useUserStore } from "@src/store/userStore";
import { useJobActionsStore } from "@src/store/useJobActionsStore";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updateJob } from "@src/services/jobs";

const KanbanBoard = () => {
  const session = useUserStore((state) => state.session);
  const { tasks, isLoading } = useTasks(session?.user?.id!);
  const tasksData = tasks || [];
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const setJobsData = useJobActionsStore((state) => state.setJobsData);
  const jobs = useJobActionsStore((state) => state.jobsData);
  console.log("Jobs from store:", jobs);

  const { mutate: updateJobMutate } = useSupabaseMutation(
    (vars: { id: string; status: string }) =>
      updateJob(vars.id, { status: vars.status }),
    {}
  );

  useEffect(() => {
    if (tasksData) {
      setJobsData(tasksData);
    }
  }, [tasks]);

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

  const tasksByStatus = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.id] = jobs.filter((task) => task.status === col.id);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [jobs, columns, session?.user.id]);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const activeId = active.id;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    // Dropping task over another task (reordering within same column or moving to different column)
    if (isActiveTask && isOverTask) {
      const overId = over.id;

      setJobsData((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // If tasks are in the same column, just reorder them
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];

        activeTask.status = overTask.status;

        updateJobMutate({ id: activeTask.id, status: overTask.status });

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "column";
    if (isActiveTask && isOverColumn) {
      const overId = String(over.id) as Task["status"];
      setJobsData((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].status = overId;
        updateJobMutate({ id: String(activeId), status: overId });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
    // Dropping task over a column (moving to different column)
    else if (isActiveTask && !isOverTask) {
      const overId = over.id as Task["status"]; // When over a column, over.id is the status
      setJobsData((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: overId } : task
        )
      );
      updateJobMutate({ id: String(activeId), status: overId });
    }
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
            key={col.id}
            column={col}
            tasks={tasksByStatus[col.id] || []}
            isLoading={isLoading}
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
