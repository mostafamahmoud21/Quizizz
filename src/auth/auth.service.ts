import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Instructor, Student } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { LoginStudentDto } from './dto/student/login-student.dto';
import { Role } from './enums/roles.enum'; // Ensure this path is correct

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  // Instructor Registration
  async registerInstructor(dto: RegisterInstructorDto): Promise<Partial<Instructor>> {
    const existingInstructor = await this.prisma.instructor.findUnique({ where: { email: dto.email } });
    if (existingInstructor) {
      throw new ConflictException('Instructor already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdInstructor = await this.prisma.instructor.create({
      data: { ...dto, password: hashedPassword, role: Role.INSTRUCTOR }, // Use enum for role
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    return createdInstructor;
  }

  // Instructor Login
  async loginInstructor(dto: LoginInstructorDto): Promise<{ instructor: Instructor; access_token: string }> {
    const instructor = await this.prisma.instructor.findUnique({
      where: { email: dto.email },
    });
    if (!instructor) {
      throw new UnauthorizedException('Instructor not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, instructor.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: instructor.id,
      name: instructor.name,
      email: instructor.email,
      role: instructor.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      instructor: instructor,
      access_token: token,
    };
  }

  // Student Registration
  async registerStudent(dto: CreateStudentDto): Promise<Partial<Student>> {
    const existingStudent = await this.prisma.student.findUnique({ where: { email: dto.email } });
    if (existingStudent) {
      throw new ConflictException('Student already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdStudent = await this.prisma.student.create({
      data: { ...dto, password: hashedPassword, role: Role.STUDENT }, // Use enum for role
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    return createdStudent;
  }

  // Student Login
  async loginStudent(dto: LoginStudentDto): Promise<{ student: Student; access_token: string }> {
    const student = await this.prisma.student.findUnique({
      where: { email: dto.email },
    });
    if (!student) {
      throw new UnauthorizedException('Student not found');
    }
  
    // Check if passwords are valid
    if (!dto.password || !student.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(dto.password, student.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role,
    };
  
    const token = this.jwtService.sign(payload);
  
    return {
      student: student,
      access_token: token,
    };
  }
  
}
