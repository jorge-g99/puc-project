"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";

export interface Student {
  id: string;
  name: string;
  email: string;
}

export function useStudents() {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery<Student[], Error>({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await api.get<Student[]>('/students');
      return data;
    },
  });

  const createStudent = useMutation<Student, Error, { name: string; email: string }>({
    mutationFn: async (student: { name: string; email: string }) => {
      const { data } = await api.post<Student>('/students', student);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const updateStudent = useMutation<Student, Error, Student>({
    mutationFn: async (student: Student) => {
      const { data } = await api.put<Student>(`/students/${student.id}`, student);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const deleteStudent = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await api.delete(`/students/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });


  return { studentsQuery, createStudent, updateStudent, deleteStudent };
}
