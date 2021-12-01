import { createTheme } from "@mui/material/styles";

export const ecologiTheme = createTheme({
  palette: {
    primary: {
      main: "#336341",
    },
    secondary: {
      main: "#33691e",
    },
  },
  typography: {
    fontFamily: ["Sofia Pro", "Helvetica", "Arial", "sans-serif"].join(","),
  },
});
