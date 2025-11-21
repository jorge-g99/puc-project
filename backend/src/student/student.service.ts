import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    const existing = await this.prisma.student.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Student email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.student.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.student.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }
}
