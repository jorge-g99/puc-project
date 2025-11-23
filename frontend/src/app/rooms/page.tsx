"use client";

import { useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, Tooltip, Box, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRooms } from "@/hooks/useRooms";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RoomsPage() {
  const { roomsQuery, createRoom, deleteRoom } = useRooms();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState<number | ''>('');

  if (roomsQuery.isLoading) return <p>Carregando...</p>;
  if (roomsQuery.isError) return <p>Erro ao carregar salas</p>;

  const rooms = roomsQuery.data || [];

  const handleCreate = () => {
    if (!name || !type) return;
    createRoom.mutate({ name, type, capacity: capacity || undefined });
    setName('');
    setType('');
    setCapacity('');
  };

  const columnStyles = {
    name: { width: 200 },
    type: { width: 150 },
    capacity: { width: 100 },
    actions: { width: 100 },
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" mb={2}>Rooms</Typography>

      {/* Formulário de criação */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: 200 }}
          />
          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ width: 150 }}
          />
          <TextField
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            sx={{ width: 100 }}
          />
          <Button variant="contained" onClick={handleCreate}>
            Criar
          </Button>
        </Box>
      </Paper>

      {/* Tabela de Rooms */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={columnStyles.name}><strong>Name</strong></TableCell>
              <TableCell sx={columnStyles.type}><strong>Type</strong></TableCell>
              <TableCell sx={columnStyles.capacity}><strong>Capacity</strong></TableCell>
              <TableCell sx={columnStyles.actions} align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell sx={columnStyles.name}>{room.name}</TableCell>
                <TableCell sx={columnStyles.type}>{room.type}</TableCell>
                <TableCell sx={columnStyles.capacity}>{room.capacity || '-'}</TableCell>
                <TableCell sx={columnStyles.actions} align="right">
                  <Tooltip title="Deletar">
                    <IconButton onClick={() => deleteRoom.mutate(room.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
}
