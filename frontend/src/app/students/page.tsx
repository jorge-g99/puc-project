"use client";

import { useState } from "react";
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, Button, Tooltip, Box, Pagination
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useStudents, Student } from "@/hooks/useStudents";
import StudentForm from "@/components/forms/StudentForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const limit = 10; // quantidade por página
  const { studentsQuery, createStudent, updateStudent, deleteStudent } = useStudents(page, limit);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  if (studentsQuery.isLoading) return <p>Carregando...</p>;
  if (studentsQuery.isError) return <p>Erro ao carregar estudantes</p>;

  const students = studentsQuery.data?.data || [];
  const totalPages = studentsQuery.data?.totalPages || 1;

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

  return (
    <DashboardLayout>
      <Typography variant="h4" mb={2}>Students</Typography>

      {/* Formulário de criação */}
      <Box mb={3}>
        <StudentForm onSubmit={(data) => createStudent.mutate(data)} />
      </Box>

      {/* Tabela de estudantes */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                {editingId === student.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        size="small"
                        fullWidth
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        size="small"
                        fullWidth
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
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
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell align="right">
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
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </DashboardLayout>
  );
}
