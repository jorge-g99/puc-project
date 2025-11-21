import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    const existing = await this.prisma.room.findUnique({ where: { name: dto.name } });
    if (existing) throw new ConflictException('Room name already exists');

    return this.prisma.room.create({
      data: {
        name: dto.name,
        type: dto.type,
        capacity: dto.capacity,
      },
    });
  }

  findAll() {
    return this.prisma.room.findMany();
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
