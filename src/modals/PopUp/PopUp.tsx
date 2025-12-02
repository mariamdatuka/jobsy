import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import type { ButtonConfig, PopUpProps } from "@src/types/PopUpTypes";
import Text from "@src/components/general/Text";
import MainButton from "@src/components/general/Button";
import X from "@src/assets/icons/x-close.svg";
import PopUpIcons from "./PopUpIcons";

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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialogTitle-root, .MuiDialogContent-root": {
          padding: "12px 0px",
        },
        ...sx,
      }}
      slotProps={{
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
        <img
          src={X}
          alt="close"
          onClick={onClose}
          width="25px"
          height="25px"
          style={{ alignSelf: "end", cursor: "pointer" }}
        />
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
          <Text variant="body1" color="text.secondary">
            {description}
          </Text>
        )}
        {children}
      </DialogContent>
      {showActionSection && (
        <DialogActions
        // sx={{
        //   width: "100%",
        // }}
        >
          {actionButtons.map(
            (
              { label, onClick, color, disabled, hidden, variant, buttonSx },
              index
            ) => {
              if (hidden) return null;

              return (
                <MainButton
                  key={index}
                  title={label}
                  onClick={onClick}
                  color={color}
                  disabled={disabled}
                  variant={variant}
                  sx={buttonSx}
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
