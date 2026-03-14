import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6a42ab",
      // custom: "#f4ebff",
    },
    secondary: {
      main: "#1F1F1F",
      dark: "#475467",
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 832,
      md: 980,
      lg: 1150,
      xl: 1380,
      xxl: 1536,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          position: "fixed",
        },
      },
    },
  },
});

export default theme;
