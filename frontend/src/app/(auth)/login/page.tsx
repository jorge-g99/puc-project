"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/dashboard";
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Login</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
