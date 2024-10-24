import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request } from 'express';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    createCourse(req: Request, createCourseDto: CreateCourseDto): Promise<{
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
    findAllCourses(req: Request): Promise<{
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        instructor: {
            name: string;
            email: string;
        };
    }[]>;
    findOne(id: string): Promise<{
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
    update(req: Request, id: string, updateCourseDto: UpdateCourseDto): Promise<{
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
    remove(req: Request, id: string): Promise<{
        message: string;
    }>;
}
