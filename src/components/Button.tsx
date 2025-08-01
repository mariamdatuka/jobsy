import { Button } from "@mui/material";
import { type ButtonProps } from "@mui/material";

type MainButtonProps = ButtonProps & {
  title: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
};

const MainButton = ({
  title,
  variant = "contained",
  startIcon,
  endIcon,
  ...props
}: MainButtonProps) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      disableElevation
      {...props}
    >
      {title}
    </Button>
  );
};

export default MainButton;
