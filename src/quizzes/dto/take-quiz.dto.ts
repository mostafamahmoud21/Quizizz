import { IsNotEmpty } from 'class-validator';

export class TakeQuizDto {
  @IsNotEmpty()
  quizId: number;
}
