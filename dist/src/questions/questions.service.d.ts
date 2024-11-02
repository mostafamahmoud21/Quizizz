import { PrismaClient } from '@prisma/client';
import { AutomaticQuestionDto, CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    createOnlyQuestion(createQuestionDto: CreateQuestionDto, instructorId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    getQuestions(quizId: number, instructorId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }[]>;
    getQuestionById(instructorId: number, questionId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    deleteQuestion(questionId: number, instructorId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    automaticQuestion(quizId: number, automaticQuestionDto: AutomaticQuestionDto, instructorId: number): Promise<any[]>;
}
