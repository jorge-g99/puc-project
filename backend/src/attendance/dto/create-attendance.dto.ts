import { IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  room: string;
}
