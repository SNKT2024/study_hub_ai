import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222831", // Dark Gray
    },
    secondary: {
      main: "#FFD369", // Yellow
    },
    background: {
      default: "#EEEEEE", // Light Gray
      paper: "#393E46", // Medium Gray
    },
    text: {
      primary: "#222831", // Light Gray
      secondary: "#222831", // Dark Gray
    },
  },
});

export default theme;
