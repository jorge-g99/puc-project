import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  roomId: number;
}
