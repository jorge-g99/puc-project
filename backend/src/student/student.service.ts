import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    const existing = await this.prisma.student.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Student email already exists');

    const randomPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    return this.prisma.student.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.StudentWhereInput = search
      ? { name: { contains: search, mode: Prisma.QueryMode.insensitive } }
      : {};

    const [students, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        select: { id: true, name: true, email: true },
        skip,
        take: limit,
        where,
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Student not found');

    if (dto.email && dto.email !== existing.email) {
      const emailExists = await this.prisma.student.findUnique({ where: { email: dto.email } });
      if (emailExists) throw new ConflictException('Email already in use');
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        email: dto.email ?? existing.email,
      },
      select: { id: true, name: true, email: true },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Student not found');

    return this.prisma.student.delete({ where: { id } });
  }
}
