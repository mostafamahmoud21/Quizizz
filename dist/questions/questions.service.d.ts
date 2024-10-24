import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number): Promise<{
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
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    DeleteQues(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    findByQuiz(quizId: number): Promise<{
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
    updateQuestion(quizId: number, questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuestion(quizId: number, questionId: number, instructorId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        level: import(".prisma/client").$Enums.Levels;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
