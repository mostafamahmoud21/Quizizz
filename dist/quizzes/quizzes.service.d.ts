import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
export declare class QuizzesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createQuiz(createQuizDto: CreateQuizDto, instructorId: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuizzes(): Promise<{
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
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto, instructorId: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructorId: number;
        courseId: number;
        type: import(".prisma/client").$Enums.Types;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuiz(id: number, instructorId: number): Promise<{
        message: string;
    }>;
    private ensureQuizExists;
    takeQuiz(quizId: number, studentId: number): Promise<{
        id: number;
        quizId: number;
        studentId: number;
        score: number;
        dateTaken: Date;
    }>;
    submitAnswers(quizId: number, studentId: number, answers: SubmitAnswersDto): Promise<{
        message: string;
    }>;
    getStudentResult(studentId: number, quizId: number): Promise<{
        quizId: number;
        studentId: number;
        score: number;
    }>;
    getAllResults(quizId: number): Promise<{
        studentId: number;
        score: number;
    }[]>;
}
