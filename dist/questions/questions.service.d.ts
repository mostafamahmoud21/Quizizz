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
        text: string;
        quizId: number;
    }>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    DeleteQues(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    findByQuiz(quizId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }[]>;
}
