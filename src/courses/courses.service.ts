import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async createCourseServices(createCourseDto: CreateCourseDto, instructorId: number) {
    try {
      const course = await this.PrismaService.course.create({
        data: {
          title: createCourseDto.title,
          description: createCourseDto.description,
          instructorId: instructorId,
        },
      });

      return {
        course,
        message: { success: 'Course created successfully' },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create course',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllCoursesServices(instructorId: number) {
    return await this.PrismaService.course.findMany({
      where: { instructorId },
      select: {
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        instructor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.PrismaService.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, instructorId: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    
    if (course.instructorId !== instructorId) {
      throw new HttpException('You are not authorized to update this course', HttpStatus.FORBIDDEN);
    }

    try {
      const updatedCourse = await this.PrismaService.course.update({
        where: { id },
        data: {
          title: updateCourseDto.title,
          description: updateCourseDto.description,
        },
      });

      return {
        updatedCourse,
        message: { success: 'Course updated successfully' },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to update course',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number, instructorId: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
  
    
    if (course.instructorId !== instructorId) {
      throw new HttpException('You are not authorized to delete this course', HttpStatus.FORBIDDEN);
    }

    try {
      await this.PrismaService.course.delete({
        where: { id },
      });

      return { message: 'Course removed successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to remove course',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

   //** assign student to course
  async assignStudentToCourse(instructorId: number, courseId: number, studentId: number) {
    // Check if course exists
    const course = await this.PrismaService.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found!`);
    }

    // Check if the instructor is the owner of the course
    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You do not have permission to assign students to this course!');
    }

    // Check if student exists
    const student = await this.PrismaService.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found!`);
    }

    // Assign student to the course
    const enrollment = await this.PrismaService.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });

    return enrollment;
  }
}
