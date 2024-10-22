import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string;  // Corresponds to the 'text' field in the Question model

    @IsInt()
    quizId: number; // Ensure quizId is an integer
}

export class UpdateQuestionDto {
    @IsString()
    @IsOptional() // This field is optional since it may not be included in every update
    @IsNotEmpty()
    text?: string;
}

