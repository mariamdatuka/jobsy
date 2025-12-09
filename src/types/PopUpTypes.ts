import type { SxProps } from "@mui/material";

// export type PopupTypeProps = "success" | "destructive";
export type PopupIconTypeProps = "success" | "error" | "warning";

export interface PopUpProps {
  title?: string;
  description?: string | React.ReactNode;
  buttons?: ButtonConfig[];
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
  iconType?: PopupIconTypeProps;
  // actionButtons?: {
  //   success: {
  //     label: string;
  //     onClick: (data?: any) => void;
  //   };
  //   cancel: {
  //     label: string;
  //     onClick: (data?: any) => void;
  //   };
  // };
  sx?: SxProps;
  paperSx?: SxProps;
  showCancelBtn?: boolean;
  showCloseButton?: boolean;
  customDescription?: React.ReactElement;
  showHeader?: boolean;
  showActionSection?: boolean;
  children?: React.ReactNode;
}

export interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined";
  color?: any;
  disabled?: boolean;
  submitType?: "cancel" | "submit";
  hidden?: boolean;
  dataTestId?: string;
  buttonSx?: SxProps;
  [key: string]: any;
}
