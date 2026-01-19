// const handleDragEnd = (event: DragEndEvent) => {
//   setActiveCard(null);
//   const { active, over } = event;

//   if (!over) return;
//   if (active.id === over.id) return;

//   const activeTask = jobs.find((t) => t.id === active.id);
//   if (!activeTask) return;

//   const isActiveTask = active.data.current?.type === "task";
//   const isOverTask = over.data.current?.type === "task";
//   const isOverColumn = over.data.current?.type === "column";

//   let targetStatus: string;
//   let columnTasksWithoutActive: Task[];
//   let newIndex: number;

//   if (isOverTask) {
//     const overTask = jobs.find((t) => t.id === over.id);
//     if (!overTask) return;

//     targetStatus = overTask.status;

//     // Get sorted tasks in target column, excluding the dragged task
//     columnTasksWithoutActive = tasksByStatus[targetStatus].filter(
//       (t) => t.id !== activeTask.id
//     );

//     // 🔥 Find the target position in the filtered array
//     const overIndexInFiltered = columnTasksWithoutActive.findIndex(
//       (t) => t.id === over.id
//     );

//     // Calculate new index for this position
//     newIndex = getNewIndexOrderByPosition(
//       columnTasksWithoutActive,
//       overIndexInFiltered
//     );
//   } else if (isOverColumn) {
//     targetStatus = String(over.id);

//     // Get tasks in target column, excluding the dragged task
//     columnTasksWithoutActive = tasksByStatus[targetStatus].filter(
//       (t) => t.id !== activeTask.id
//     );

//     // Drop at end
//     newIndex = getNewIndexOrderByPosition(columnTasksWithoutActive);
//   } else {
//     return;
//   }

//   // Update state
//   setJobsData((tasks) =>
//     tasks.map((t) =>
//       t.id === activeTask.id
//         ? {
//             ...t,
//             index_number: newIndex,
//             status: targetStatus as Task["status"],
//           }
//         : t
//     )
//   );

//   // Update DB
//   updateJobMutate({
//     id: activeTask.id,
//     status: targetStatus,
//     index_number: newIndex,
//   });
// };
