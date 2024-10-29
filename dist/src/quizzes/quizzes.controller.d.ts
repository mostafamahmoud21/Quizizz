import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { Request } from 'express';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    createQuiz(courseId: number, req: Request, createQuizDto: CreateQuizDto): Promise<{
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    startQuiz(courseId: number, quizId: number, req: Request): Promise<{
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
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getQuizById(id: number): Promise<{
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuiz(id: string, updateQuizDto: UpdateQuizDto, req: Request): Promise<{
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
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
