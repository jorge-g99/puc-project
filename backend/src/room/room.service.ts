import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Prisma } from '@prisma/client';

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

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.RoomWhereInput = search
      ? { name: { contains: search, mode: Prisma.QueryMode.insensitive } }
      : {};

    const [rooms, total] = await this.prisma.$transaction([
      this.prisma.room.findMany({
        select: { id: true, name: true, type: true, capacity: true },
        skip,
        take: limit,
        where,
      }),
      this.prisma.room.count({ where }),
    ]);

    return {
      data: rooms,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
