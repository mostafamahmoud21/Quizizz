import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuestions(quizId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuestionById(quizId: number, questionId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuestion(quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuestion(quizId: number, questionId: number, instructorId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
