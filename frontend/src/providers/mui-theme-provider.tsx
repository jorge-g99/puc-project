"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8a0538" },
    secondary: { main: "#9c27b0" },
    background: {
      default: "#f5f5f5", // cor de fundo principal
      paper: "#ffffff",    // cor de componentes Paper
    },
  }
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
