import { IsString, Min } from 'class-validator';

export class updateChoiceDto {
  @IsString()
  @Min(3)
  text: string;
}
