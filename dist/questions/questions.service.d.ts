import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    DeleteQues(id: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByQuiz(quizId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
