
import { IsEmail, IsString, MinLength} from "class-validator";

export class LoginInstructorDto{

@IsString()
@MinLength(3)
name: string;

@IsEmail()
email: string;


@IsString()
@MinLength(8)
password: string;
}