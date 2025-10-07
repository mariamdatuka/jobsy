import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6a42ab",
      // custom: "#f4ebff",
    },
    secondary: {
      main: "#1F1F1F",
      light: "#666b73",
    },
    error: {
      main: "#FB344F",
    },
    info: {
      main: "#240854",
    },
    text: {
      secondary: "#344054",
    },
  },
  typography: {
    fontFamily: '"Manrope", "Viga"',
  },
});

export default theme;
