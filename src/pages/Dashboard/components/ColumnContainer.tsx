import { Box, Stack, styled, Typography } from "@mui/material";
import Text from "@src/components/general/Text";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import JobCard from "./JobCard";
import { tasksData } from "./KanbanBoard";

interface Column {
  title: string;
  color: string;
}

const ColumnContainer = ({ column }: { column: Column }) => {
  const { transform, transition, setNodeRef, listeners, attributes } =
    useSortable({
      id: column.title,
      data: {
        type: "column",
        column,
      },
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <>
      <Box
        sx={{ width: { xs: "50px", md: "300px" } }}
        ref={setNodeRef}
        style={style}
      >
        <TitleBox bgcolor={column.color} {...listeners} {...attributes}>
          <Text variant="body2" color="#fff">
            {column.title}
          </Text>
          <Typography component="span" color="#fff">
            /
          </Typography>
          <Text color="#fff">3</Text>
        </TitleBox>
        <ColumnBox>
          <JobCard />
        </ColumnBox>
      </Box>
    </>
  );
};

export default ColumnContainer;

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
