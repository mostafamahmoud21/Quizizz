import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';
import { NotFoundGuard } from './guards/not-found';
import { ValidationPipe } from './pipes/numeric-id.pipe';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  createCourse(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    const instructorId = (req.user as User).id;
    return this.coursesService.createCourseServices(createCourseDto, instructorId);
  }

  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  findAllCourses(@Req() req: Request) {
    const instructorId = (req.user as User).id;
    return this.coursesService.findAllCoursesServices(instructorId);
  }

  @Get(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  update(@Req() req: Request, @Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    const instructorId = (req.user as User).id;
    return this.coursesService.update(+id, updateCourseDto, instructorId);
  }

  @Delete(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  remove(@Req() req: Request, @Param('id') id: number) {
    const instructorId = (req.user as User).id;
    return this.coursesService.remove(+id, instructorId);
  }

  //** assign student to course
  @Post(':courseId/students/:studentId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async assignStudentToCourse(
    @Req() req: Request,
    @Param('courseId') courseId: number,
    @Param('studentId') studentId: number,
  ) {
    const instructorId = (req.user as User).id;
    return this.coursesService.assignStudentToCourse(instructorId, courseId, studentId);
  }
}
