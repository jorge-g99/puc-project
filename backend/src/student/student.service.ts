import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const student = this.studentRepo.create({ ...dto, password: hashedPassword });
    return this.studentRepo.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  findOne(id: number): Promise<Student | null> {
    return this.studentRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepo.delete(id);
  }
}
