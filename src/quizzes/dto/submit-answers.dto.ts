<<<<<<< HEAD
import { IsArray, IsNotEmpty } from 'class-validator';

export class SubmitAnswersDto {
    @IsArray({ message: 'answers must be an array' })
    @IsNotEmpty({ message: 'answers should not be empty' })
    answers: Array<{ questionId: number; answer: string }>;
=======
import { IsArray, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNumber()
  questionId: number;

  @IsString()
  answerText: string;
}

export class SubmitAnswersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
>>>>>>> 66e1d7db664d8fb642bf14abfb28b6a14bd7ba04
}
