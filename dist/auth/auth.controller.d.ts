import { AuthService } from './auth.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { LoginInstructorDto } from './dto/instructor/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerInstructor(dto: RegisterInstructorDto): Promise<Partial<{
        name: string;
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>>;
    loginInstructor(dto: LoginInstructorDto): Promise<{
        instructor: import(".prisma/client").Instructor;
        access_token: string;
    }>;
}
