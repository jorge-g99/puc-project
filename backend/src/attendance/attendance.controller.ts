import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('entry')
  registerEntry(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.registerEntry(dto);
  }

  @Post('exit/:id')
  registerExit(@Param('id') id: string) {
    return this.attendanceService.registerExit(+id);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }
}
