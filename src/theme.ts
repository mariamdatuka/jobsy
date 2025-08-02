import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E0189",
    },
    secondary: {
      main: "#1F1F1F",
    },
    error: {
      main: "#FB344F",
    },
    info: {
      main: "#240854",
    },
    text: {
      primary: "#9d6cf0",
      secondary: "#999EA1",
    },
  },
  typography: {
    fontFamily: '"Manrope", "Viga"',
  },
});

export default theme;
