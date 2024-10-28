import { ChoicesService } from './choices.service';
import { createChoiceDto } from './dto/create-choice.dto';
import { updateChoiceDto } from './dto/update-choice.dto';
import { Request } from 'express';
export declare class ChoicesController {
    private readonly choicesService;
    constructor(choicesService: ChoicesService);
    createChoice(questionId: number, req: Request, createChoiceDto: createChoiceDto): Promise<{
        questionId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
    }>;
    updateChoice(id: number, questionId: number, req: Request, updateChoiceDto: updateChoiceDto): Promise<{
        questionId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
    }>;
    deleteChoice(id: number, questionId: number, req: Request): Promise<{
        questionId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
    }>;
}
