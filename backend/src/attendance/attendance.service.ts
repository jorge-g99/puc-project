import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async registerEntry(dto: CreateAttendanceDto) {
    const student = await this.prisma.student.findUnique({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const room = await this.prisma.room.findUnique({ where: { id: dto.roomId } });
    if (!room) throw new NotFoundException('Room not found');

    return this.prisma.attendance.create({
      data: {
        studentId: dto.studentId,
        roomId: dto.roomId,
        entryTime: new Date(),
      },
    });
  }

  async registerExit(id: number) {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } });
    if (!attendance) throw new NotFoundException('Attendance record not found');

    return this.prisma.attendance.update({
      where: { id },
      data: { exitTime: new Date() },
    });
  }

  findAll() {
    return this.prisma.attendance.findMany({
      include: { student: true, room: true },
    });
  }
}
