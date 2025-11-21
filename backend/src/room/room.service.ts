import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async createRoom(name: string, type: string, capacity?: number) {
    return this.prisma.room.create({
      data: { name, type, capacity },
    });
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findById(id: number) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async deleteRoom(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
