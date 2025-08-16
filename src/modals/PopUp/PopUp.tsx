import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import type { PopUpProps } from "@src/types/PopUpTypes";

const PopUp = ({
  title,
  description,
  buttons,
  open,
  onClose,
  isMobile,
  iconType,
  actionButtons,
  sx,
  paperSx,
  showCancelBtn,
  showCloseButton,
  showHeader,
  showActionSection,
}: PopUpProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button>bla</button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
