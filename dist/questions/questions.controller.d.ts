import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    DeleteQuestion(id: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    QuestionWithQuizId(quizId: number): Promise<{
        id: number;
        text: string;
        quizId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
