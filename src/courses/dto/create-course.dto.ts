import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}

