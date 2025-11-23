"use client";

import { useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, Tooltip, Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useStudents, Student } from "@/hooks/useStudents";
import StudentForm from "@/components/forms/StudentForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function StudentsPage() {
  const { studentsQuery, createStudent, updateStudent, deleteStudent } = useStudents();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  if (studentsQuery.isError) return <p>Erro ao carregar estudantes</p>;

  const students = studentsQuery.data || [];

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditEmail(student.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const submitEdit = (id: string) => {
    updateStudent.mutate({ id, name: editName, email: editEmail });
    cancelEdit();
  };

  const columnStyles = {
    name: { width: 200 },
    email: { width: 250 },
    actions: { width: 150 },
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" mb={2}>Students</Typography>

      <Box mb={3}>
        <StudentForm onSubmit={(data) => createStudent.mutate(data)} />
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={columnStyles.name}><strong>Nome</strong></TableCell>
              <TableCell sx={columnStyles.email}><strong>Email</strong></TableCell>
              <TableCell sx={columnStyles.actions} align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                {editingId === student.id ? (
                  <>
                    <TableCell sx={columnStyles.name}>
                      <TextField
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        size="small"
                        fullWidth
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={columnStyles.email}>
                      <TextField
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        size="small"
                        fullWidth
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={columnStyles.actions} align="right">
                      <Tooltip title="Salvar">
                        <IconButton color="success" onClick={() => submitEdit(student.id)}>
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancelar">
                        <IconButton color="error" onClick={cancelEdit}>
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={columnStyles.name}>{student.name}</TableCell>
                    <TableCell sx={columnStyles.email}>{student.email}</TableCell>
                    <TableCell sx={columnStyles.actions} align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => startEdit(student)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton onClick={() => deleteStudent.mutate(student.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
}
