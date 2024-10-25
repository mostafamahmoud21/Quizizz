import { IsArray, IsNotEmpty } from 'class-validator';

export class SubmitAnswersDto {
    @IsArray({ message: 'answers must be an array' })
    @IsNotEmpty({ message: 'answers should not be empty' })
    answers: Array<{ questionId: number; answer: string }>;
}
