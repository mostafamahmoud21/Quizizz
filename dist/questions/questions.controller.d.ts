import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createQuestion(quizId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    DeleteQuestion(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }>;
    QuestionWithQuizId(quizId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        quizId: number;
        text: string;
    }[]>;
}
