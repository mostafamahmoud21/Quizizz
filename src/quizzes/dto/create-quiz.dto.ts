import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;
}
