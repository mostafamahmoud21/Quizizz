import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudentsService {
    constructor(private readonly prisma: PrismaClient) { }

    async findAllCoursesServices() {
        const courses = await this.prisma.course.findMany()

        if (!courses) {
            throw new HttpException('Courses not found', HttpStatus.NOT_FOUND);
        }
        return courses
    }

    async enrollCourseServices(id: number, studentId: number) {
        const enroll = await this.prisma.enrollment.create({
            data: {
                courseId: id,
                studentId: studentId,
            }
        })
        return {
            message: 'Enrolled successfully',
        }
    }

    async findMyCourseEnrollmentServices(studentId: number) {
        return await this.prisma.enrollment.findMany({
            where: { studentId },
            select: {
                course: {
                    select: {
                        title: true,
                        description: true,
                        instructor: {
                            select: {
                                name: true
                            }
                        }
                    },
                },
            }
        })
    }

    async findCourseServices(id: number) {
        return await this.prisma.course.findUnique({
          where: { id },
          select: {
            title: true,
            description: true,
            instructor: {
              select: {
                name: true, 
              },
            },
          },
        });
      }
      
}
