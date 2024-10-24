import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    DeleteQues(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    findByQuiz(quizId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }[]>;
}
