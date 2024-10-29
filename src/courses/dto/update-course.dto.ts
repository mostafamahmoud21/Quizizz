import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto  {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
