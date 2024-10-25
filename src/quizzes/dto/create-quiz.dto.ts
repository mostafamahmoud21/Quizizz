import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'src/auth/enums/types.enum';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  type: Types

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;
}
