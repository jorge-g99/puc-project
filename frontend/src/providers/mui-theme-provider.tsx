"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8a0538" },
    secondary: { main: "#9c27b0" },
    background: {
      default: "#696969",
      paper: "#7d7d7d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#f0f0f0",
    },
  },
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
