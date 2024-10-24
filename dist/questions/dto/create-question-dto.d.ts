import { Levels } from 'src/auth/enums/levels.enum';
export declare class CreateQuestionDto {
    text: string;
    level: Levels;
}
export declare class UpdateQuestionDto {
    text?: string;
    level?: Levels;
}
