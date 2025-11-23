import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";
import toast from "react-hot-toast";

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface PaginatedStudents {
  data: Student[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useStudents(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery<PaginatedStudents, Error>({
    queryKey: ['students', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedStudents>('/students', {
        params: { page, limit },
      });
      return data;
    },
  });

  const createStudent = useMutation({
    mutationFn: async (student: { name: string; email: string }) => {
      const { data } = await api.post<Student>('/students', student);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success(`Aluno "${data.name}" criado com sucesso!`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Erro ao criar aluno');
    },
  });

  const updateStudent = useMutation({
    mutationFn: async (student: { id: string; name: string; email: string }) => {
      const { data } = await api.put<Student>(`/students/${student.id}`, student);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success(`Aluno "${data.name}" atualizado com sucesso!`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Erro ao atualizar aluno');
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/students/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Aluno deletado com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Erro ao deletar aluno');
    },
  });

  return { studentsQuery, createStudent, updateStudent, deleteStudent };
}
