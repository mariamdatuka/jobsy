import { Stack } from "@mui/material";
import ColumnContainer from "./ColumnContainer";

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

const KanbanBoard = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        border="1px solid #02c575"
        alignItems="center"
        justifyContent="center"
      >
        {columns.map((col) => (
          <ColumnContainer column={col} key={col.title} />
        ))}
      </Stack>
    </>
  );
};

export default KanbanBoard;
