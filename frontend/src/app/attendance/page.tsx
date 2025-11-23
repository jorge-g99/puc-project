"use client";

import { useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Box, TextField, Autocomplete
} from "@mui/material";
import { Room } from "@/hooks/useRooms";
import { Student } from "@/hooks/useStudents";
import { useAttendance } from "@/hooks/useAttendance";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/libs/api";

export default function AttendancePage() {
  const { attendanceQuery, registerEntry, registerExit } = useAttendance();

  const [studentInput, setStudentInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [roomInput, setRoomInput] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const studentsQuery = useQuery<Student[], Error>({
    queryKey: ['students', studentInput],
    queryFn: async () => {
      if (!studentInput) return [];
      const { data } = await api.get('/students', { params: { search: studentInput, page: 1, limit: 10 } });
      return data.data || data;
    },
    enabled: studentInput.length > 0,
  });

  const roomsQuery = useQuery<Room[], Error>({
    queryKey: ['rooms', roomInput],
    queryFn: async () => {
      if (!roomInput) return [];
      const { data } = await api.get('/rooms', { params: { search: roomInput, page: 1, limit: 10 } });
      return data.data || data;
    },
    enabled: roomInput.length > 0,
  });

  const rooms: Room[] = roomsQuery.data || [];
  const students: Student[] = studentsQuery.data || [];
  const attendance = attendanceQuery.data || [];

  const handleEntry = () => {
    if (!selectedStudent || !selectedRoom) return;
    registerEntry.mutate({ studentId: selectedStudent.id, roomId: selectedRoom.id });
    setSelectedStudent(null);
    setStudentInput('');
    setSelectedRoom(null);
    setRoomInput('');
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" mb={2}>Attendance</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Autocomplete
            sx={{ minWidth: 250 }}
            options={students}
            getOptionLabel={(option) => option.name}
            value={selectedStudent}
            onChange={(_, newValue) => setSelectedStudent(newValue)}
            inputValue={studentInput}
            onInputChange={(_, newInput) => setStudentInput(newInput)}
            loading={studentsQuery.isLoading}
            renderInput={(params) => <TextField {...params} label="Aluno" />}
            noOptionsText={studentInput.length > 0 ? "Nenhum aluno encontrado" : "Digite para buscar"}
          />

          <Autocomplete
            sx={{ minWidth: 250 }}
            options={rooms}
            getOptionLabel={(option) => option.name}
            value={selectedRoom}
            onChange={(_, newValue) => setSelectedRoom(newValue)}
            inputValue={roomInput}
            onInputChange={(_, newInput) => setRoomInput(newInput)}
            loading={roomsQuery.isLoading}
            renderInput={(params) => <TextField {...params} label="Sala" />}
            noOptionsText={roomInput.length > 0 ? "Nenhuma sala encontrada" : "Digite para buscar"}
          />

          <Button variant="contained" onClick={handleEntry}>Registrar Entrada</Button>
        </Box>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Aluno</strong></TableCell>
              <TableCell><strong>Sala</strong></TableCell>
              <TableCell><strong>Entrada</strong></TableCell>
              <TableCell><strong>Saída</strong></TableCell>
              <TableCell align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((att) => (
              <TableRow key={att.id}>
                <TableCell>{att.studentName}</TableCell>
                <TableCell>{att.roomName}</TableCell>
                <TableCell>{new Date(att.entryTime).toLocaleString()}</TableCell>
                <TableCell>{att.exitTime ? new Date(att.exitTime).toLocaleString() : '-'}</TableCell>
                <TableCell align="right">
                  {!att.exitTime && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => registerExit.mutate(att.id)}
                    >
                      Registrar Saída
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
}
