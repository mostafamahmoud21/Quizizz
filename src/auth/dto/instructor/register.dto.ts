import { IsEmail, IsString, MinLength} from "class-validator";

export class RegisterInstructorDto{

@IsString()
@MinLength(3)
name: string;

@IsEmail()
email: string;


@IsString()
@MinLength(8)
password: string;
}