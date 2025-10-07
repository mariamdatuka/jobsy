import { Stack } from "@mui/material";
import ColumnContainer from "./ColumnContainer";

const columns = [
  {
    title: "Saved",
    color: "#65cdfe",
  },
  {
    title: "Applied",
    color: "#65cdfe",
  },
  {
    title: "Interviewing",
    color: "#65cdfe",
  },
  {
    title: "Rejected",
    color: "#65cdfe",
  },
  {
    title: "Offered",
    color: "#65cdfe",
  },
];

const KanbanBoard = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        {columns.map((col) => (
          <ColumnContainer column={col} key={col.title} />
        ))}
      </Stack>
    </>
  );
};

export default KanbanBoard;
