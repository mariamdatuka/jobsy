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
import { useUserStore } from "@src/store/userStore";
import { useJobActionsStore } from "@src/store/useJobActionsStore";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updateTaskPosition } from "@src/services/jobs";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_TASKS } from "@src/services/queryKeys";
import {
  applyBusinessRules,
  getIndexForColumnDrop,
  getNewIndexOrder,
} from "@src/helpers/helpers";
import { useSearchParams } from "react-router";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import EmptyResultState from "@src/components/general/EmptyResultState";
import Spinner from "@src/components/animations/Spinner";
import { useJobsViewData } from "@src/hooks/useJobsDataView";

const KanbanBoard = () => {
  const [activeCard, setActiveCard] = useState<Task | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useUserStore((state) => state.session);
  const { areFiltersApplied } = useSetUrlParams();
  const areUrlFiltersApplied = areFiltersApplied();

  const { tasksData, isLoading, search, isPending } = useJobsViewData();

  const queryClient = useQueryClient();

  const setJobsData = useJobActionsStore((state) => state.setJobsData);
  const jobs = useJobActionsStore((state) => state.jobsData);

  useEffect(() => {
    if (tasksData.length > 0) {
      setJobsData(tasksData);
    }
  }, [tasksData, setJobsData]);

  const { mutate: updateTaskPositionMutate } = useSupabaseMutation(
    updateTaskPosition,
    {
      onSuccess: async (data) => {
        if (data?.rebalanced) {
          console.log("✨ Column auto-rebalanced");
          console.log("Min gap was:", data.min_gap);
        }

        await queryClient.invalidateQueries({
          queryKey: [QKEY_TASKS, session?.user?.id],
        });
      },
      onError: (error) => {
        console.error("Failed to update task position:", error);
      },
    },
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const tasksByStatus = useMemo(() => {
    return columns.reduce(
      (acc, col) => {
        acc[col.id] = jobs
          .filter((task) => task.status === col.id)
          .sort((a, b) => a.index_number - b.index_number);
        return acc;
      },
      {} as Record<string, Task[]>,
    );
  }, [jobs, columns]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveCard(active.data.current?.task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
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

      const columnTasks = tasksByStatus[overTask.status];

      const activeInx = columnTasks.findIndex((t) => t.id === activeTask.id);
      const overInx = columnTasks.findIndex((t) => t.id === overTask.id);
      const newIndex = getNewIndexOrder(columnTasks, activeInx, overInx);

      if (isSameColumn) {
        setJobsData((tasks) =>
          tasks.map((t) =>
            t.id === activeTask.id ? { ...t, index_number: newIndex } : t,
          ),
        );
        updateTaskPositionMutate({
          id: activeTask.id,
          status: activeTask.status,
          index_number: newIndex,
          date: activeTask.date_applied ?? null,
        });

        return;
      }
      // setJobsData((tasks) =>
      //   tasks.map((t) =>
      //     t.id === activeTask.id
      //       ? { ...t, index_number: newIndex, status: overTask.status }
      //       : t,
      //   ),
      // );

      // updateTaskPositionMutate({
      //   id: activeTask.id,
      //   status: overTask.status,
      //   index_number: newIndex,
      // });
      const updatedTask = applyBusinessRules(activeTask, overTask.status);

      setJobsData((tasks) =>
        tasks.map((t) =>
          t.id === activeTask.id
            ? {
                ...updatedTask,
                index_number: newIndex,
                status: overTask.status,
                date_applied: updatedTask.date_applied ?? undefined,
              }
            : t,
        ),
      );

      updateTaskPositionMutate({
        id: activeTask.id,
        status: overTask.status,
        index_number: newIndex,
        date: updatedTask.date_applied ?? null,
      });

      return;
    }

    const isOverColumn = over.data.current?.type === "column";
    const overId = String(over.id) as Task["status"];
    if (
      isActiveTask &&
      isOverColumn &&
      overId !== active.data.current?.task.status
    ) {
      const columnTasks = tasksByStatus[overId];

      const activeIndex = jobs.findIndex((t) => t.id === activeId);
      const activeTask = jobs[activeIndex];
      const newIndex = getIndexForColumnDrop(columnTasks);

      const updatedTask = applyBusinessRules(activeTask, overId);

      setJobsData((tasks) =>
        tasks.map((task) =>
          task.id === activeId
            ? {
                ...task,
                status: overId,
                index_number: newIndex,
                date_applied: updatedTask.date_applied ?? undefined,
              }
            : task,
        ),
      );
      updateTaskPositionMutate({
        id: activeTask.id,
        status: overId,
        index_number: newIndex,
        date: updatedTask.date_applied ?? null,
      });
    }
  };

  const showSkeleton = tasksData.length === 0 && isPending && !search; // first load only
  const showEmptyState =
    (search || areUrlFiltersApplied) && !isLoading && tasksData.length === 0;
  const showSpinner = isLoading && (search || areUrlFiltersApplied);
  const handleClearSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  if (showEmptyState)
    return (
      <EmptyResultState
        searchTerm={search}
        message={`No Results${search ? ` for:` : ""}`}
        handleClearSearch={handleClearSearch}
      />
    );

  if (showSpinner) return <Spinner />;

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Stack direction="row" spacing={2}>
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              tasks={tasksByStatus[col.id] || []}
              isLoading={showSkeleton}
            />
          ))}
        </Stack>

        {createPortal(
          <DragOverlay>
            {activeCard && <JobCard task={activeCard} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </>
  );
};

export default KanbanBoard;
