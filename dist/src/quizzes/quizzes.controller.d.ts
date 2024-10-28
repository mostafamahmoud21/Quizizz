import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { Request } from 'express';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    createQuiz(courseId: number, req: Request, createQuizDto: CreateQuizDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    startQuiz(quizId: number, req: Request): Promise<{
        message: string;
        quizAttempt: {
            id: number;
            quizId: number;
            studentId: number;
            score: number;
            dateTaken: Date;
        };
    }>;
    submitQuizAnswers(quizId: number, req: Request, submitAnswersDto: SubmitAnswersDto): Promise<{
        message: string;
        score: number;
    }>;
    getAllQuizzes(): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuizById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuiz(id: string, updateQuizDto: UpdateQuizDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuiz(id: string, req: Request): Promise<{
        message: string;
    }>;
    getStudentQuizResult(req: Request, id: number): Promise<{
        message: string;
        score: number;
    }>;
    getAllStudentsQuizResults(req: Request, id: number): Promise<{
        message: string;
        retsults: {
            score: number;
            student: {
                name: string;
            };
        }[];
    }>;
}
