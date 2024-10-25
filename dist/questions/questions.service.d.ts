import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
    }>;
    getQuestions(quizId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
    }[]>;
    getQuestionById(quizId: number, questionId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
    }>;
    updateQuestion(quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
    }>;
    deleteQuestion(quizId: number, questionId: number, instructorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
    }>;
}
