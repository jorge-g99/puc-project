"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Room } from "@/hooks/useRooms";

interface Props {
  initialData?: Room;
  onSubmit: (data: { name: string; capacity?: number }) => void; // capacity agora opcional
}

export default function RoomForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState<number | ''>(''); // pode estar vazio

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCapacity(initialData.capacity ?? ''); // undefined → ''
    }
  }, [initialData]);

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit({
      name,
      capacity: capacity === '' ? undefined : Number(capacity), // envia undefined se estiver vazio
    });
    setName('');
    setCapacity('');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ minWidth: 200 }}
      />
      <TextField
        label="Capacidade"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
        sx={{ minWidth: 100 }}
      />
      <Button type="submit" variant="contained">
        {initialData ? "Atualizar" : "Criar"}
      </Button>
    </Box>
  );
}
