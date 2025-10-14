import { Stack } from "@mui/material";
import ColumnContainer from "./ColumnContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";

interface Task {
  id: number;
  companyName: string;
  position: string;
  status: "Saved" | "Applied" | "Interviewing" | "Rejected" | "Offered";
  country: string;
  city?: string;
  appliedDate?: string;
}

const columns = [
  {
    title: "Saved",
    color: "#e0e0e0",
  },
  {
    title: "Applied",
    color: "#f8a83c ",
  },
  {
    title: "Interviewing",
    color: "#65cdfe",
  },
  {
    title: "Rejected",
    color: "#e2435b",
  },
  {
    title: "Offered",
    color: "#02c575",
  },
];

export const tasksData: Task[] = [
  {
    id: 1,
    companyName: "Microsoft",
    position: "Software Engineer",
    country: "USA",
    status: "Saved",
  },
  {
    id: 2,
    companyName: "Meta",
    position: "Software Engineer",
    status: "Applied",
    country: "USA",
    city: "San Francisco",
    appliedDate: "2023-10-01",
  },
];

const KanbanBoard = () => {
  const columnsId = columns.map((col) => col.title);
  const onDragStart = (event: any) => {
    console.log("drag start", event);
  };
  return (
    <>
      <DndContext onDragStart={onDragStart}>
        <Stack
          direction="row"
          spacing={4}
          border="1px solid #02c575"
          alignItems="center"
          justifyContent="center"
        >
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer column={col} key={col.title} />
            ))}
          </SortableContext>
        </Stack>
      </DndContext>
    </>
  );
};

export default KanbanBoard;
