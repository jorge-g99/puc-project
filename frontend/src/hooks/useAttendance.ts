"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['attendance'] }),
  });

  const registerExit = useMutation<Attendance, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.post<Attendance>(`/attendances/exit/${id}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['attendance'] }),
  });

  return { attendanceQuery, registerEntry, registerExit };
}
