"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";
import toast from "react-hot-toast";

export interface Room {
  id: string;
  name: string;
  type: string;
  capacity?: number;
}

export interface CreateRoomInput {
  name: string;
  type: string;
  capacity?: number;
}

export function useRooms(search: string = "") {
  const queryClient = useQueryClient();

  const roomsQuery = useQuery<Room[], Error>({
    queryKey: ['rooms', search],
    queryFn: async () => {
      const { data } = await api.get('/rooms', { params: { search } });
      return Array.isArray(data) ? data : data.data || [];
    },
    enabled: true,
  });

  const createRoom = useMutation<Room, Error, CreateRoomInput>({
    mutationFn: async (room) => {
      const { data } = await api.post('/rooms', room);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success(`Sala "${data.name}" criada com sucesso!`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Erro ao criar sala');
    },
  });

  const deleteRoom = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/rooms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast.success('Sala deletada com sucesso!');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Erro ao deletar sala');
    },
  });

  return { roomsQuery, createRoom, deleteRoom };
}
