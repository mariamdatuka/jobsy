import { Box, Stack, styled, Typography } from "@mui/material";
import Text from "@src/components/general/Text";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import JobCard2 from "./JobCard";
import type { Task } from "@src/types/commonTypes";

interface Column {
  id: string;
  title: string;
  color: string;
}

const ColumnContainer = ({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[] | null;
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
          <Text color="#fff">1</Text>
        </TitleBox>
        <ColumnBoxWrapper>
          <ColumnBox ref={setNodeRef}>
            {tasks && (
              <SortableContext items={tasks.map((task) => task.id)}>
                {tasks.map((task) => (
                  <JobCard2 key={task.id} task={task} />
                ))}
              </SortableContext>
            )}
          </ColumnBox>
          <FadeTop />
          <FadeBottom />
        </ColumnBoxWrapper>
      </Box>
    </>
  );
};

export default ColumnContainer;

const TitleBox = styled(Stack)<{ bgcolor: string }>(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  padding: "10px 16px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
}));

const ColumnBoxWrapper = styled(Box)({
  position: "relative",
  height: "450px",
  maxHeight: "450px",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
  overflow: "hidden",
});

const ColumnBox = styled(Stack)({
  height: "100%",
  padding: "20px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  backgroundColor: "#f5f7f9",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  MsOverflowStyle: "none",
});

const FadeTop = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "30px",
  background:
    "linear-gradient(to bottom, rgba(245, 247, 249, 1) 0%, rgba(245, 247, 249, 0) 100%)",
  pointerEvents: "none",
  zIndex: 1,
});

const FadeBottom = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "30px",
  background:
    "linear-gradient(to top, rgba(245, 247, 249, 1) 0%, rgba(245, 247, 249, 0) 100%)",
  pointerEvents: "none",
  zIndex: 1,
});
