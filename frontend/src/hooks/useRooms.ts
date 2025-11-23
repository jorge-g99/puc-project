"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";

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

export function useRooms() {
  const queryClient = useQueryClient();

  const roomsQuery = useQuery<Room[], Error>({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await api.get<Room[]>('/rooms');
      return data;
    },
  });

  const createRoom = useMutation<Room, Error, CreateRoomInput>({
    mutationFn: async (room) => {
      const { data } = await api.post<Room>('/rooms', room);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rooms'] }),
  });

  const deleteRoom = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/rooms/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rooms'] }),
  });

  return { roomsQuery, createRoom, deleteRoom };
}
