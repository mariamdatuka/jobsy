import * as React from "react";
import Box from "@mui/material/Box";
import Popper, { type PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { styled, Divider } from "@mui/material";
import Text from "../general/Text";
import type { Task } from "@src/types/commonTypes";
import { useJobActionsStore } from "@src/store/useJobActionsStore";

interface ActionsType {
  label: string;
  onClick: () => void;
}

const jobActions = (task: Task) => [
  {
    label: "Edit",
    onClick: () => useJobActionsStore.getState().onEditJob(task),
  },
  {
    label: "Delete",
    onClick: () => useJobActionsStore.getState().onDeleteJob(task.id),
  },
];

type CustomPopperProps = {
  actions?: ActionsType[];
  handleJobActionsClick?: (action: string) => void;
  open?: boolean;
  placement?: PopperPlacementType;
  anchorEl?: HTMLElement | null;
  handleClose: () => void;
  task: Task;
};

export default function CustomPopper({
  actions,
  open = false,
  anchorEl = null,
  handleClose,
  placement = "bottom-start",
  task,
}: CustomPopperProps) {
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  const resolvedActions: ActionsType[] = actions ?? jobActions(task);

  return (
    <Popper
      id={id}
      open={canBeOpen}
      anchorEl={anchorEl}
      transition
      placement={placement}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box>
            <ClickAwayListener onClickAway={handleClose}>
              <CustomBox>
                {resolvedActions.map((action, idx) => (
                  <React.Fragment key={action.label}>
                    <Text
                      color="secondary.light"
                      sx={{ cursor: "pointer", fontSize: "12px" }}
                      onClick={() => action.onClick?.()}
                    >
                      {action.label}
                    </Text>
                    {idx !== resolvedActions.length - 1 && (
                      <Divider sx={{ width: "100%" }} />
                    )}
                  </React.Fragment>
                ))}
              </CustomBox>
            </ClickAwayListener>
          </Box>
        </Fade>
      )}
    </Popper>
  );
}

const CustomBox = styled(Box)({
  border: "1px solid #ddd",
  padding: 4,
  width: "100px",
  borderRadius: "4px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  alignItems: "center",
  justifyContent: "center",
});
