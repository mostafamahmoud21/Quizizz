import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { Request } from 'express';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(req: Request, createQuizDto: CreateQuizDto): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    takeQuiz(quizId: string, req: Request): Promise<{
        id: number;
        quizId: number;
        studentId: number;
        score: number;
        dateTaken: Date;
    }>;
    submitAnswers(quizId: string, submitAnswersDto: SubmitAnswersDto, req: Request): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto, req: Request): Promise<{
        title: string;
        description: string;
        id: number;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: Request): Promise<{
        message: string;
    }>;
}
