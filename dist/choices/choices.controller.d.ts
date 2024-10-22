import { ChoicesService } from './choices.service';
import { createChoiceDto } from './dto/create-choice.dto';
export declare class ChoicesController {
    private readonly choicesService;
    constructor(choicesService: ChoicesService);
    createChoice(questionId: string, createChoiceDto: createChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
}
