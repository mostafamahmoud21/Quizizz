import { QuestionsService } from './questions.service';
import { AutomaticQuestionDto, CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Request } from 'express';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(req: Request, quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    createWithoutQuiz(req: Request, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    findAll(quizId: number, req: Request): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }[]>;
    findOne(req: Request, questionId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    update(req: Request, questionId: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    remove(req: Request, questionId: number): Promise<{
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        level: import(".prisma/client").$Enums.Levels;
        correctAnswer: string;
    }>;
    createAutomatic(req: Request, quizId: number, automaticQuestionDto: AutomaticQuestionDto): Promise<any[]>;
}
