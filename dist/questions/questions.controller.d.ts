import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Request } from 'express';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(req: Request, quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
<<<<<<< HEAD
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
=======
>>>>>>> 7a9aedb1b08defe3c0d31199ba090d340ddc0f16
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
<<<<<<< HEAD
    getQuestions(quizId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
=======
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    DeleteQuestion(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    QuestionWithQuizId(quizId: number): Promise<{
        id: number;
>>>>>>> 7a9aedb1b08defe3c0d31199ba090d340ddc0f16
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
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
