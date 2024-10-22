import { AuthService } from './auth.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { LoginStudentDto } from './dto/student/login-student.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerInstructor(dto: RegisterInstructorDto): Promise<Partial<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>>;
    loginInstructor(dto: LoginInstructorDto): Promise<{
        instructor: import(".prisma/client").Instructor;
        access_token: string;
    }>;
    registerStudent(dto: CreateStudentDto): Promise<Partial<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>>;
    loginStudent(dto: LoginStudentDto): Promise<{
        student: import(".prisma/client").Student;
        access_token: string;
    }>;
    protectedRoute(): Promise<{
        message: string;
    }>;
}
