import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createCourseServices(createCourseDto: CreateCourseDto, instructorId: number): Promise<{
        course: {
            id: number;
            title: string;
            description: string;
            instructorId: number;
            createdAt: Date;
            updatedAt: Date;
        };
        message: {
            success: string;
        };
    }>;
    findAllCoursesServices(instructorId: number): Promise<{
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: {
            name: string;
            email: string;
        };
    }[]>;
    findOne(id: number): Promise<{
        instructor: {
            name: string;
            email: string;
        };
    } & {
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateCourseDto: UpdateCourseDto, instructorId: number): Promise<{
        updatedCourse: {
            id: number;
            title: string;
            description: string;
            instructorId: number;
            createdAt: Date;
            updatedAt: Date;
        };
        message: {
            success: string;
        };
    }>;
    remove(id: number, instructorId: number): Promise<{
        message: string;
    }>;
}
