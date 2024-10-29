import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Levels } from 'src/auth/enums/levels.enum';

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string;  // Corresponds to the 'text' field in the Question model

    @IsString()
    @IsNotEmpty()
    correctAnswer:string;
    // @IsInt()
    // quizId: number; // Ensure quizId is an integer
    @IsEnum(Levels, { message: 'Level must be either Easy, Medium, or Hard' })
    level: Levels;

}

export class UpdateQuestionDto {
    @IsString()
    @IsOptional() 
    @IsNotEmpty()
    text?: string;

    @IsString()
    @IsOptional() 
    @IsNotEmpty()
    correctAnswer?:string;

    @IsNotEmpty()
    @IsOptional()
    @IsEnum(Levels, { message: 'Level must be either Easy, Medium, or Hard' })
    level?: Levels;
}


