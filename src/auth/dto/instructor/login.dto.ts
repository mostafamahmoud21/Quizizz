import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginInstructorDto {
  @IsString()
  @MinLength(3)
  name?: string; // Marked as optional

  @IsEmail()
  email!: string; // Use definite assignment operator

  @IsString()
  @MinLength(8)
  password!: string; // Use definite assignment operator
}
