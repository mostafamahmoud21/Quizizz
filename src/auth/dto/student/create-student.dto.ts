import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name!: string; // Use definite assignment operator

  @IsNotEmpty()
  @IsEmail()
  email!: string; // Use definite assignment operator

  @IsNotEmpty()
  @IsString()
  password!: string; // Use definite assignment operator
}
