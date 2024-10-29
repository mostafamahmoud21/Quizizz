import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Request } from 'express';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(req: Request, quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    getQuestions(quizId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }[]>;
    getQuestionById(quizId: number, questionId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    updateQuestion(req: Request, quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    deleteQuestion(req: Request, quizId: number, questionId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
}
