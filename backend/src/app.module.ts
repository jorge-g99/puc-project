import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { RoomModule } from './room/room.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    StudentModule,
    RoomModule,
    AttendanceModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
