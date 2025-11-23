"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";
import toast from "react-hot-toast";

export interface Attendance {
  id: string;
  studentId: string;
  roomId: string;
  entryTime: string;
  exitTime?: string;
  studentName: string;
  roomName: string;
}

export interface CreateAttendanceInput {
  studentId: string;
  roomId: string;
}

export function useAttendance() {
  const queryClient = useQueryClient();

  const attendanceQuery = useQuery<Attendance[], Error>({
    queryKey: ['attendance'],
    queryFn: async () => {
      const { data } = await api.get<Attendance[]>('/attendances');
      return data;
    },
  });

  const registerEntry = useMutation<Attendance, Error, CreateAttendanceInput>({
    mutationFn: async (input) => {
      const { data } = await api.post<Attendance>('/attendances/entry', input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success(`Entrada registrada: ${data.studentName} em ${data.roomName}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Erro ao registrar entrada');
    },
  });

  const registerExit = useMutation<Attendance, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.post<Attendance>(`/attendances/exit/${id}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success(`Saída registrada: ${data.studentName} de ${data.roomName}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Erro ao registrar saída');
    },
  });

  return { attendanceQuery, registerEntry, registerExit };
}
