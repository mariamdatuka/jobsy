import { useSortable } from "@dnd-kit/sortable";
import { Box, Divider, Stack, styled } from "@mui/material";
import { KebabMenu } from "@src/assets/icons/KebabMenu";
import Text from "@src/components/general/Text";
import theme from "@src/theme";
import type { Task } from "./KanbanBoard";
import { CSS } from "@dnd-kit/utilities";

const JobCard = ({ task }: { task: Task }) => {
  const {
    transform,
    transition,
    setNodeRef,
    listeners,
    attributes,
    isDragging,
  } = useSortable({
    id: task.taskID,
    data: {
      type: "task",
      task,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  if (isDragging) {
    return (
      <Box
        px="10px"
        py="14px"
        minHeight="120px"
        backgroundColor="#fff"
        border="1px solid #c03631ff"
        borderRadius="12px"
      ></Box>
    );
  }

  return (
    <JobContainer
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        cursor: isDragging ? "grabbing" : "grab",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text variant="body2" fontWeight="600">
          {task.companyName}
        </Text>
        <KebabMenu />
      </Stack>
      <Text variant="caption" color={theme.palette.secondary.light}>
        {task.position}
      </Text>
      <Divider sx={{ borderColor: "#eceef2", my: 1.2 }} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {task?.appliedDate && (
          <Text variant="caption" color={theme.palette.secondary.dark}>
            {task.appliedDate}
          </Text>
        )}

        <CountryTag>{task.country}</CountryTag>
      </Stack>
    </JobContainer>
  );
};

export default JobCard;

const JobContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "10px 14px",
  border: "1px solid #eceef2",
  borderRadius: "12px",
  gap: "4px",
}));

const CountryTag = styled(Box)(({ theme }) => ({
  backgroundColor: "#F2F4F7",
  color: theme.palette.secondary.dark,
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  fontWeight: 500,
}));
