import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Types } from '../../auth/enums/types.enum';

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  @MaxLength(100) 
  title?: string;

  @IsString()
  type?: Types

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
