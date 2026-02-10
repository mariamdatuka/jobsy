import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import type { ButtonConfig, PopUpProps } from "@src/types/PopUpTypes";
import Text from "@src/components/general/Text";
import MainButton from "@src/components/general/Button";
import PopUpIcons from "./PopUpIcons";
import CloseIcon from "@src/assets/icons/CloseIcon";

const PopUp = ({
  title,
  description,
  buttons,
  open,
  onClose,
  isMobile,
  iconType,
  sx,
  showCloseButton = true,
  showHeader = true,
  showActionSection = true,
  children,
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
      disableScrollLock
      sx={{
        "& .MuiDialogTitle-root, .MuiDialogContent-root": {
          padding: "12px 0px",
        },
        position: "fixed",
        ...sx,
      }}
      slotProps={{
        backdrop: {
          sx: {
            position: "fixed",
          },
        },
        paper: {
          sx: {
            padding: "30px",
            width: isMobile ? "100%" : "500px",
            maxWidth: "100%",
            borderRadius: "10px !important",
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent: "center",
            overflowX: "hidden",
          },
        },
      }}
    >
      {showCloseButton && (
        <IconButton
          aria-label="Close dialog"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {iconType && <PopUpIcons type={iconType} />}

      {showHeader && (
        <DialogTitle>
          <Text
            variant="body1"
            fontSize="28px"
            color="secondary.main"
            fontWeight={600}
          >
            {title}
          </Text>
        </DialogTitle>
      )}
      <DialogContent>
        {description && (
          <Text variant="body1" color="text.secondary" mb={2}>
            {description}
          </Text>
        )}
        {children}
      </DialogContent>
      {showActionSection && (
        <DialogActions
          sx={{
            marginTop: "5px",
          }}
        >
          {actionButtons.map((button, index) => {
            const { label, hidden, buttonSx, ...rest } = button as any;
            if (hidden) return null;

            return (
              <MainButton key={index} title={label} {...rest} sx={buttonSx} />
            );
          })}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PopUp;
