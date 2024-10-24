import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCourseServices(createCourseDto: CreateCourseDto, instructorId: number) {
    try {
      const course = await this.prisma.course.create({
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
    return await this.prisma.course.findMany({
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
    const course = await this.prisma.course.findUnique({
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

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, instructorId: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    if (course.instructorId !== instructorId) {
      throw new HttpException('You are not authorized to update this course', HttpStatus.FORBIDDEN);
    }

    try {
      const updatedCourse = await this.prisma.course.update({
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
    
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    
    if (course.instructorId !== instructorId) {
      throw new HttpException('You are not authorized to delete this course', HttpStatus.FORBIDDEN);
    }

    try {
      await this.prisma.course.delete({
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
}
