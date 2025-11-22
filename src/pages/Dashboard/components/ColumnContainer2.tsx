import { Box, Stack, styled, Typography } from "@mui/material";
import Text from "@src/components/general/Text";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import JobCard from "./JobCard";
import { type Task } from "./KanbanBoard2";
import JobCard2 from "./JobCard2";

interface Column {
  id: string;
  title: string;
  color: string;
}

const ColumnContainer2 = ({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[];
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  return (
    <>
      <Box
        sx={{
          width: "230px",
        }}
      >
        <TitleBox bgcolor={column.color}>
          <Text variant="body2" color="#fff">
            {column.title}
          </Text>
          <Typography component="span" color="#fff">
            /
          </Typography>
          <Text color="#fff">{tasks.length}</Text>
        </TitleBox>
        <ColumnBox ref={setNodeRef}>
          <SortableContext items={tasks.map((task) => task.taskID)}>
            {tasks.map((task) => (
              <JobCard2 key={task.taskID} task={task} />
            ))}
          </SortableContext>
        </ColumnBox>
      </Box>
    </>
  );
};

export default ColumnContainer2;

const TitleBox = styled(Stack)<{ bgcolor: string }>(({ bgcolor, theme }) => ({
  backgroundColor: bgcolor,
  padding: "10px 16px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
}));

const ColumnBox = styled(Stack)({
  height: "450px",
  maxHeight: "450px",
  padding: "20px 12px",
  backgroundColor: "#f5f7f9",
  overflowY: "scroll",
  scrollbarWidth: "none",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
});
