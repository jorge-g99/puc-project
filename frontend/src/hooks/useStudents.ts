import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const updateStudent = useMutation({
    mutationFn: async (student: { id: string; name: string; email: string }) => {
      const { data } = await api.put<Student>(`/students/${student.id}`, student);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/students/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  return { studentsQuery, createStudent, updateStudent, deleteStudent };
}
