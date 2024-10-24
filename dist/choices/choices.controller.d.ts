import { ChoicesService } from './choices.service';
import { createChoiceDto } from './dto/create-choice.dto';
import { updateChoiceDto } from './dto/update-choice.dto';
import { Request } from 'express';
export declare class ChoicesController {
    private readonly choicesService;
    constructor(choicesService: ChoicesService);
    createChoice(questionId: number, req: Request, createChoiceDto: createChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
    updateChoice(id: number, questionId: number, req: Request, updateChoiceDto: updateChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
    deleteChoice(id: number, questionId: number, req: Request): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
}
