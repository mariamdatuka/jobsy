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
import ColumnContainer from "./ColumnContainer";
import JobCard from "./JobCard";
import { columns } from "@src/helpers/constanst";
import type { Task } from "@src/types/commonTypes";
import { useTasks } from "@src/hooks/useTasks";
import { useUserStore } from "@src/store/userStore";
import { useJobActionsStore } from "@src/store/useJobActionsStore";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updateJob } from "@src/services/jobs";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_TASKS } from "@src/services/queryKeys";
import { getNewIndexOrder } from "@src/helpers/helpers";

const KanbanBoard = () => {
  const session = useUserStore((state) => state.session);
  const { tasks, isLoading } = useTasks(session?.user?.id!);
  const tasksData = tasks || [];
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const setJobsData = useJobActionsStore((state) => state.setJobsData);
  const jobs = useJobActionsStore((state) => state.jobsData);

  const { mutate: updateJobMutate } = useSupabaseMutation(
    (vars: { id: string; status: string; index_number: number }) =>
      updateJob(vars.id, {
        status: vars?.status,
        index_number: vars.index_number,
      })
    // {
    //   onSuccess: async (_data, _vars) => {
    //     await queryClient.invalidateQueries({
    //       queryKey: [QKEY_TASKS, _vars.id],
    //     });
    //   },
    // }
  );

  useEffect(() => {
    if (tasksData) {
      setJobsData(tasksData);
    }
  }, []);

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
      acc[col.id] = jobs
        .filter((task) => task.status === col.id)
        .sort((a, b) => a.index_number - b.index_number);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [jobs, columns]);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const activeId = active.id;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";

    if (isActiveTask && isOverTask) {
      const overId = over.id;
      const activeIndex = jobs.findIndex((t) => t.id === activeId);
      const overIndex = jobs.findIndex((t) => t.id === overId);

      const activeTask = jobs[activeIndex];
      const overTask = jobs[overIndex];

      const isSameColumn = activeTask.status === overTask.status;

      // If tasks are in the same column, just reorder them
      //   if (isSameColumn) {
      //     setJobsData((tasks) => {
      //       const activeIndex = tasks.findIndex((t) => t.id === activeId);
      //       const overIndex = tasks.findIndex((t) => t.id === overId);
      //       return arrayMove(tasks, activeIndex, overIndex);
      //     });

      //     return;
      //   }

      //   setJobsData((tasks) =>
      //     tasks.map((t) =>
      //       t.id === activeTask.id ? { ...t, status: overTask.status } : t
      //     )
      //   );

      //   updateJobMutate({
      //     id: activeTask.id,
      //     status: overTask.status,
      //   });
      //   return;
      // }

      if (isSameColumn) {
        const columnTasks = tasksByStatus[activeTask.status];

        const newIndex = getNewIndexOrder(columnTasks, overTask.id);

        setJobsData((tasks) =>
          tasks.map((t) =>
            t.id === activeTask.id ? { ...t, index_order: newIndex } : t
          )
        );

        updateJobMutate({
          id: activeTask.id,
          status: activeTask.status,
          index_number: newIndex,
        });

        return;
      }
    }

    const isOverColumn = over.data.current?.type === "column";
    if (isActiveTask && isOverColumn) {
      const overId = String(over.id) as Task["status"];
      setJobsData((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: overId } : task
        )
      );
      // updateJobMutate({ id: String(activeId), status: overId });
    }
    // // Dropping task over a column (moving to different column)
    // else if (isActiveTask && !isOverTask) {
    //   const overId = over.id as Task["status"]; // When over a column, over.id is the status
    //   setJobsData((tasks) =>
    //     tasks.map((task) =>
    //       task.id === activeId ? { ...task, status: overId } : task
    //     )
    //   );
    //   updateJobMutate({ id: String(activeId), status: overId });
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
