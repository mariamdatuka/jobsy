import { Typography, type TypographyProps } from "@mui/material";

interface TextProps extends TypographyProps {
  children: React.ReactNode;
  color?: string;
}
const Text = ({
  color = "primary",
  variant = "body2",
  children,
  ...rest
}: TextProps) => {
  return (
    <Typography variant={variant} color={color} {...rest}>
      {children}{" "}
    </Typography>
  );
};

export default Text;
