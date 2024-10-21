import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Instructor } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaClient, jwtService: JwtService);
    registerInstructor(dto: RegisterInstructorDto): Promise<Partial<Instructor>>;
    loginInstructor(dto: LoginInstructorDto): Promise<{
        instructor: Instructor;
        access_token: string;
    }>;
}
