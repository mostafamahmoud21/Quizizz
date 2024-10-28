import { Levels } from 'src/auth/enums/levels.enum';
export declare class CreateQuestionDto {
    text: string;
    correctAnswer: string;
    level: Levels;
}
export declare class UpdateQuestionDto {
    text?: string;
    correctAnswer?: string;
    level?: Levels;
}
