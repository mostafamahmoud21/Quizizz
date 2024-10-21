import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Instructor } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient, 
    @Inject(JwtService) private readonly jwtService: JwtService, // Changed to lowercase
  ) {}

  async registerInstructor(dto: RegisterInstructorDto): Promise<Partial<Instructor>> {
    const existingInstructor = await this.prisma.instructor.findUnique({ where: { email: dto.email } });
    if (existingInstructor) {
      throw new ConflictException('Instructor already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createdInstructor = await this.prisma.instructor.create({
      data: { ...dto, password: hashedPassword },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createdInstructor;
  }

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
    };
  
    console.log('Signing payload:', payload); // Log the payload being signed
    const token = this.jwtService.sign(payload);
    console.log('Generated token:', token); // Log the generated token
  
    return {
      instructor: instructor,
      access_token: token,
    };
  }
  
}
