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

    const attendance = await this.prisma.attendance.create({
      data: {
        studentId: dto.studentId,
        roomId: dto.roomId,
        entryTime: new Date(),
      },
      include: { student: true, room: true },
    });

    return {
      id: attendance.id.toString(),
      studentId: attendance.studentId.toString(),
      roomId: attendance.roomId.toString(),
      entryTime: attendance.entryTime,
      exitTime: attendance.exitTime,
      studentName: attendance.student.name,
      roomName: attendance.room.name,
    };
  }

  async registerExit(id: number) {
    const attendance = await this.prisma.attendance.update({
      where: { id },
      data: { exitTime: new Date() },
      include: { student: true, room: true },
    });

    return {
      id: attendance.id.toString(),
      studentId: attendance.studentId.toString(),
      roomId: attendance.roomId.toString(),
      entryTime: attendance.entryTime,
      exitTime: attendance.exitTime,
      studentName: attendance.student.name,
      roomName: attendance.room.name,
    };
  }

  async findAll() {
    const attendances = await this.prisma.attendance.findMany({
      include: { student: true, room: true },
      orderBy: { entryTime: 'desc' },
    });

    return attendances.map(a => ({
      id: a.id.toString(),
      studentId: a.studentId.toString(),
      roomId: a.roomId.toString(),
      entryTime: a.entryTime,
      exitTime: a.exitTime,
      studentName: a.student.name,
      roomName: a.room.name,
    }));
  }
}

