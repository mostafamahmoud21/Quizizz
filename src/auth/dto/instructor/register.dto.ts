import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterInstructorDto {
  @IsString()
  @MinLength(3)
  name!: string; // Use definite assignment operator

  @IsEmail()
  email!: string; // Use definite assignment operator

  @IsString()
  @MinLength(8)
  password!: string; // Use definite assignment operator
}
