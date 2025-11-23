import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('attendances')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('entry')
  @Roles(Role.ADMIN, Role.STAFF)
  registerEntry(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.registerEntry(dto);
  }

  @Post('exit/:id')
  @Roles(Role.ADMIN, Role.STAFF)
  registerExit(@Param('id') id: string) {
    return this.attendanceService.registerExit(+id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  findAll() {
    return this.attendanceService.findAll();
  }
}
