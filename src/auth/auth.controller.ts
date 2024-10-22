import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/roles.enum';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { CreateStudentDto } from './dto/student/create-student.dto';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { LoginStudentDto } from './dto/student/login-student.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('instructor/register')
  async registerInstructor(@Body() dto: RegisterInstructorDto) {
    return this.authService.registerInstructor(dto);
  }

  @Post('instructor/login')
  async loginInstructor(@Body() dto: LoginInstructorDto) {
    return this.authService.loginInstructor(dto);
  }

  @Post('student/register')
  async registerStudent(@Body() dto: CreateStudentDto) {
    return this.authService.registerStudent(dto);
  }

  @Post('student/login')
  async loginStudent(@Body() dto: LoginStudentDto) {
    return this.authService.loginStudent(dto);
  }

  @Post('protected-route')
  @UseGuards(RolesGuard) // Apply guard to this route only
  @Roles(Role.INSTRUCTOR) // Protect this route for instructors only
  async protectedRoute() {
    return { message: 'This route is protected for instructors only.' };
  }
}
