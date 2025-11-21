import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'staff'])
  role: string;
}
