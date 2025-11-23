"use client";

import { useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, MenuItem, Select, FormControl, InputLabel, Box
} from "@mui/material";
import { useStudents } from "@/hooks/useStudents";
import { useRooms } from "@/hooks/useRooms";
import { useAttendance } from "@/hooks/useAttendance";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AttendancePage() {
  const { studentsQuery } = useStudents();
  const { roomsQuery } = useRooms();
  const { attendanceQuery, registerEntry, registerExit } = useAttendance();

  const [studentId, setStudentId] = useState('');
  const [roomId, setRoomId] = useState('');

  if (studentsQuery.isLoading || roomsQuery.isLoading || attendanceQuery.isLoading) return <p>Carregando...</p>;
  if (studentsQuery.isError || roomsQuery.isError || attendanceQuery.isError) return <p>Erro ao carregar dados</p>;

  const students = studentsQuery.data || [];
  const rooms = roomsQuery.data || [];
  const attendance = attendanceQuery.data || [];

  const handleEntry = () => {
    if (!studentId || !roomId) return;
    registerEntry.mutate({ studentId, roomId });
    setStudentId('');
    setRoomId('');
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" mb={2}>Attendance</Typography>

      {/* Registro de entrada */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Aluno</InputLabel>
            <Select
              value={studentId}
              label="Aluno"
              onChange={(e) => setStudentId(e.target.value)}
            >
              {students.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sala</InputLabel>
            <Select
              value={roomId}
              label="Sala"
              onChange={(e) => setRoomId(e.target.value)}
            >
              {rooms.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleEntry}>Registrar Entrada</Button>
        </Box>
      </Paper>

      {/* Tabela de presenças */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 200 }}><strong>Aluno</strong></TableCell>
              <TableCell sx={{ width: 200 }}><strong>Sala</strong></TableCell>
              <TableCell sx={{ width: 180 }}><strong>Entrada</strong></TableCell>
              <TableCell sx={{ width: 180 }}><strong>Saída</strong></TableCell>
              <TableCell sx={{ width: 120 }} align="right"><strong>Ações</strong></TableCell>
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
