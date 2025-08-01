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
    //#240854
  },
  typography: {
    fontFamily: "Manrope",
  },
});

export default theme;
