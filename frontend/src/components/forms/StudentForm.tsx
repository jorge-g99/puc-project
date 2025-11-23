"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Student } from "@/hooks/useStudents";

interface Props {
  initialData?: Student;
  onSubmit: (data: { name: string; email: string }) => void;
}

export default function StudentForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    }
  }, [initialData]);

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit({ name, email });
    setName('');
    setEmail('');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        {initialData ? "Atualizar" : "Criar"}
      </Button>
    </Box>
  );
}
