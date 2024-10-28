import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { Request } from 'express';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(courseId: number, req: Request, createQuizDto: CreateQuizDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    takeQuiz(quizId: number, req: Request): Promise<{
        message: string;
        quizAttempt: {
            id: number;
            quizId: number;
            studentId: number;
            score: number;
            dateTaken: Date;
        };
    }>;
    submitAnswers(quizId: number, req: Request, submitAnswersDto: SubmitAnswersDto): Promise<{
        message: string;
        score: number;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: Request): Promise<{
        message: string;
    }>;
}
