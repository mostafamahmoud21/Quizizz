import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(quizId: string, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        text: string;
        quizId: number;
    }[]>;
}
