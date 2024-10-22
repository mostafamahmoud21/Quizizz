import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Request } from 'express';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(req: Request, createQuizDto: CreateQuizDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
