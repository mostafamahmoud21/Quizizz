import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizzesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createQuiz(createQuizDto: CreateQuizDto, instructorId: number): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuizzes(): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuizById(id: number): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto, instructorId: number): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuiz(id: number, instructorId: number): Promise<{
        message: string;
    }>;
    private ensureQuizExists;
}
