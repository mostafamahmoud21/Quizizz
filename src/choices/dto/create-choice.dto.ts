import { IsString, MinLength } from 'class-validator';

export class createChoiceDto {
  @IsString()
  @MinLength(3, { message: 'Text must be at least 3 characters long' })
  text: string;
}
