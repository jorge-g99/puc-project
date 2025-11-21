import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsInt()
  capacity?: number;
}
