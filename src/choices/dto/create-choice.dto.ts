import { IsString, Min } from 'class-validator';

export class createChoiceDto {
  @IsString()
  @Min(3)
  text: string;
}
