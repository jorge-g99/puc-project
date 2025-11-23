import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.ADMIN, Role.STAFF)
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
