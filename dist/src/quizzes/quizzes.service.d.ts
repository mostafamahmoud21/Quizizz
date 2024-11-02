import { PrismaClient } from '@prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
export declare class QuizzesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createQuiz(courseId: number, createQuizDto: CreateQuizDto, instructorId: number): Promise<{
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuizzes(): Promise<{
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
    getQuizWithQuestions(quizId: number): Promise<{
        questions: ({
            question: {
                choices: {
                    questionId: number;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    text: string;
                }[];
            } & {
                id: number;
                instructorId: number;
                createdAt: Date;
                updatedAt: Date;
                text: string;
                level: import(".prisma/client").$Enums.Levels;
                correctAnswer: string;
            };
        } & {
            questionId: number;
            quizId: number;
        })[];
    } & {
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto, instructorId: number): Promise<{
        title: string;
        type: import(".prisma/client").$Enums.Types;
        description: string;
        id: number;
        instructorId: number;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuiz(id: number, instructorId: number): Promise<{
        message: string;
    }>;
    getResultQuizService(id: number, studentId: number): Promise<{
        message: string;
        score: number;
    }>;
    getResultQuizStudentsService(id: number, instructorId: number): Promise<{
        message: string;
        results: {
            score: number;
            student: {
                name: string;
            };
        }[];
    }>;
    private ensureQuizExists;
    takeQuiz(quizId: number, studentId: number, courseId: number): Promise<{
        message: string;
        quizAttempt: {
            id: number;
            quizId: number;
            studentId: number;
            score: number;
            dateTaken: Date;
        };
    }>;
    submitQuizAnswers(quizId: number, studentId: number, submitAnswersDto: SubmitAnswersDto): Promise<{
        message: string;
        score: number;
    }>;
}
