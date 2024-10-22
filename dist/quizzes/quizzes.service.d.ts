import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizzesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createQuiz(createQuizDto: CreateQuizDto, instructorId: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllQuizzes(): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findQuizById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeQuiz(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private ensureQuizExists;
}
