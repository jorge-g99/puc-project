import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Student } from '../student/student.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async registerEntry(dto: CreateAttendanceDto) {
    const student = await this.studentRepo.findOneBy({ id: dto.studentId });
    if (!student) throw new Error('Student not found');

    const attendance = this.attendanceRepo.create({
      student,
      room: dto.room,
      entryTime: new Date(),
    });
    return this.attendanceRepo.save(attendance);
  }

  async registerExit(id: number) {
    const attendance = await this.attendanceRepo.findOneBy({ id });
    if (!attendance) throw new Error('Attendance record not found');

    attendance.exitTime = new Date();
    return this.attendanceRepo.save(attendance);
  }

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepo.find();
  }
}
