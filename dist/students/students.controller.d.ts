import { StudentsService } from './students.service';
import { Request } from 'express';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAllCourses(req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    enrollCourse(id: number, req: Request): Promise<{
        message: string;
    }>;
    findMyCourseEnrollment(req: Request): Promise<{
        course: {
            title: string;
            description: string;
            instructor: {
                name: string;
            };
        };
    }[]>;
    findCourse(id: number): Promise<{
        title: string;
        description: string;
        instructor: {
            name: string;
        };
    }>;
}
