import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Request } from 'express';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(req: Request, quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
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
    updateQuestion(req: Request, quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuestion(req: Request, quizId: number, questionId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
