import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginStudentDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string; // Use definite assignment operator

  @IsNotEmpty()
  @IsString()
  password!: string; // Use definite assignment operator
}
