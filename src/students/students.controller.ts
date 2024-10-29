import { Controller, Get, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';
import { NotFoundGuard } from './guards/not-found';
import { ValidationPipe } from './pipes/numeric-id.pipe';
@Controller('/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/courses')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.STUDENT,Role.INSTRUCTOR)
  findAllCourses(@Req() req: Request) {
    return this.studentsService.findAllCoursesServices();
  }

  @Post('/courses/:id/enroll')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.STUDENT)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  enrollCourse(@Param('id') id: number, @Req() req: Request) {
    const studentId = (req.user as User).id;
    return this.studentsService.enrollCourseServices(+id, studentId);
  }

  @Get('/CourseEnrollment')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.STUDENT)
  findMyCourseEnrollment(@Req() req: Request) {
    const studentId = (req.user as User).id;
    return this.studentsService.findMyCourseEnrollmentServices(studentId);
  }

  @Get('/course/:id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.STUDENT)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  findCourse(@Param('id') id:number) {
    return this.studentsService.findCourseServices(+id);
  }
}
