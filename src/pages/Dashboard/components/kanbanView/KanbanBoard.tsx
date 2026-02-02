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
import { updateTaskPosition } from "@src/services/jobs";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_TASKS } from "@src/services/queryKeys";
import {
  decodeDate,
  getIndexForColumnDrop,
  getNewIndexOrder,
} from "@src/helpers/helpers";
import { useSearchParams } from "react-router";
import type { FiltersState } from "@src/store/useFiltersStore";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import EmptyResultState from "@src/components/general/EmptyResultState";
import Spinner from "@src/components/animations/Spinner";

const KanbanBoard = () => {
  const [activeCard, setActiveCard] = useState<Task | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const session = useUserStore((state) => state.session);

  const { getParamArrayUpper } = useSetUrlParams();

  const appliedFilters: FiltersState = {
    status: getParamArrayUpper("status") ?? [],
    jobType: getParamArrayUpper("jobType") ?? [],
    date: decodeDate(searchParams),
  };
  const { tasks, isPending, isLoading } = useTasks(session?.user?.id!, {
    search,
    filters: appliedFilters,
  });
  const tasksData = tasks || [];

  const queryClient = useQueryClient();

  const setJobsData = useJobActionsStore((state) => state.setJobsData);
  const jobs = useJobActionsStore((state) => state.jobsData);

  const { mutate: updateTaskPositionMutate } = useSupabaseMutation(
    (vars: { id: string; status: string; index_number: number }) =>
      updateTaskPosition(vars.id, vars.status, vars.index_number),
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

  useEffect(() => {
    if (tasksData && tasksData.length > 0) {
      setJobsData(tasksData);
    }
  }, [tasksData, setJobsData]);

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
        });

        return;
      }
      setJobsData((tasks) =>
        tasks.map((t) =>
          t.id === activeTask.id
            ? { ...t, index_number: newIndex, status: overTask.status }
            : t,
        ),
      );

      updateTaskPositionMutate({
        id: activeTask.id,
        status: overTask.status,
        index_number: newIndex,
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

      setJobsData((tasks) =>
        tasks.map((task) =>
          task.id === activeId
            ? { ...task, status: overId, index_number: newIndex }
            : task,
        ),
      );
      updateTaskPositionMutate({
        id: activeTask.id,
        status: overId,
        index_number: newIndex,
      });
    }
  };

  const showSkeleton = tasksData.length === 0 && isPending && !search; // first load only
  const showEmptyState = search && !isLoading && tasksData.length === 0;
  const showSpinner = isLoading && search;

  if (showEmptyState)
    return <EmptyResultState searchTerm={search} message="No results for" />;

  if (showSpinner) return <Spinner />;

  return (
    <>
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
