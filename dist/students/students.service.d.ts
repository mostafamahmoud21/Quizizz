import { PrismaClient } from '@prisma/client';
export declare class StudentsService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAllCoursesServices(): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    enrollCourseServices(id: number, studentId: number): Promise<{
        message: string;
    }>;
    findMyCourseEnrollmentServices(studentId: number): Promise<{
        course: {
            title: string;
            description: string;
            instructor: {
                name: string;
            };
        };
    }[]>;
    findCourseServices(id: number): Promise<{
        title: string;
        description: string;
        instructor: {
            name: string;
        };
    }>;
}
