import { useSortable } from "@dnd-kit/sortable";
import { Box, Divider, Stack, styled } from "@mui/material";
import { KebabMenu } from "@src/assets/icons/KebabMenu";
import Text from "@src/components/general/Text";
import theme from "@src/theme";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@src/types/commonTypes";
import CustomPopper from "@src/components/popper/CustomPopper";
import EditActions from "./EditActions";

const JobCard = ({ task }: { task: Task }) => {
  const {
    transform,
    transition,
    setNodeRef,
    listeners,
    attributes,
    isDragging,
  } = useSortable({
    id: task.id,
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
      <JobContainer
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #eceef2",
          borderRadius: "12px",
          opacity: 0.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="body2" fontWeight="600">
            {task.company_name}
          </Text>
          <KebabMenu />
        </Stack>
        <Text variant="caption" color={theme.palette.secondary.light}>
          {task.position}
        </Text>
        <Divider sx={{ borderColor: "#eceef2", my: 1.2 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {task?.date_applied && (
            <Text variant="caption" color={theme.palette.secondary.dark}>
              {task.date_applied}
            </Text>
          )}

          <CountryTag>{task?.country}</CountryTag>
        </Stack>
      </JobContainer>
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
          {task.company_name}
        </Text>
        <EditActions />
      </Stack>
      <Text variant="caption" color={theme.palette.secondary.light}>
        {task.position}
      </Text>
      <Divider sx={{ borderColor: "#eceef2", my: 1.2 }} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {task?.date_applied && (
          <Text variant="caption" color={theme.palette.secondary.dark}>
            {task.date_applied}
          </Text>
        )}

        <CountryTag>{task?.country}</CountryTag>
      </Stack>
    </JobContainer>
  );
};

export default JobCard;

const JobContainer = styled(Stack)(() => ({
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
