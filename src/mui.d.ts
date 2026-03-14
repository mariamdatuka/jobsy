import { BreakpointOverrides } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    tablet: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
