import * as React from "react";
import Box from "@mui/material/Box";
import Popper, { type PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { editJobActions } from "@src/helpers/constanst";
import { styled, Divider } from "@mui/material";
import Text from "../general/Text";

type CustomPopperProps = {
  actions?: string[];
  onClick?: () => void;
  open?: boolean;
  placement?: PopperPlacementType;
  anchorEl?: HTMLElement | null;
  handleClose: () => void;
};

export default function CustomPopper({
  actions = editJobActions,
  open = false,
  onClick,
  anchorEl = null,
  handleClose,
  placement = "bottom-start",
}: CustomPopperProps) {
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

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
                {actions.map((action, idx) => (
                  <React.Fragment key={action}>
                    <Text
                      color="secondary.light"
                      sx={{ cursor: "pointer", fontSize: "12px" }}
                      onClick={onClick}
                    >
                      {action}
                    </Text>
                    {idx !== actions.length - 1 && (
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
