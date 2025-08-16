import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import type { ButtonConfig, PopUpProps } from "@src/types/PopUpTypes";
import Text from "@components/Text";
import MainButton from "@src/components/Button";

const PopUp = ({
  title,
  description,
  buttons,
  open,
  onClose,
  isMobile,
  iconType,
  // actionButtons:actions,
  sx,
  paperSx,
  showCancelBtn,
  showCloseButton,
  showHeader = true,
  showActionSection = true,
}: PopUpProps) => {
  const defaultButtons: ButtonConfig[] = [
    {
      label: "Cancel",
      onClick: onClose,
      color: "primary",
      variant: "outlined",
    },
    {
      label: "Save",
      onClick: onClose,
      color: "primary",
      variant: "contained",
    },
  ];

  const actionButtons = buttons || defaultButtons;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialogTitle-root, .MuiDialogActions-root": {
          padding: "25px",
        },
        // "& .MuiDialog-container": {
        //   display: "flex",
        //   alignItems: isMobile ? "flex-end" : "center",
        //   justifyContent: "center",
        // },
        ...sx,
      }}
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : "630px",
            maxWidth: "100%",
            borderRadius: "10px !important",
            ...paperSx,
          },
        },
        container: {
          sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
      }}
    >
      {showHeader && (
        <DialogTitle>
          <Text variant="h5" color="info.main">
            {title}
          </Text>
        </DialogTitle>
      )}
      <DialogContent>
        <Text variant="body1" color="info.main">
          {description}
        </Text>
      </DialogContent>
      {showActionSection && (
        <DialogActions>
          {actionButtons.map(
            ({ label, onClick, color, disabled, hidden, variant }, index) => {
              if (hidden) return null;
              return (
                <MainButton
                  key={index}
                  title={label}
                  onClick={onClick}
                  color={color}
                  disabled={disabled}
                  variant={variant}
                />
              );
            }
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PopUp;
