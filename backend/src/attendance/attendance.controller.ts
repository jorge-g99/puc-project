import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('attendances')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('entry')
  @Roles('admin', 'staff')
  registerEntry(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.registerEntry(dto);
  }

  @Post('exit/:id')
  @Roles('admin', 'staff')
  registerExit(@Param('id') id: string) {
    return this.attendanceService.registerExit(+id);
  }

  @Get()
  @Roles('admin', 'staff')
  findAll() {
    return this.attendanceService.findAll();
  }
}
