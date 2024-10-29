import { updateChoiceDto } from './dto/update-choice.dto';
import { PrismaService } from './../prisma/prisma.service';
import { createChoiceDto } from './dto/create-choice.dto';
export declare class ChoicesService {
    private readonly PrismaService;
    constructor(PrismaService: PrismaService);
    createChoice(questionId: number, instructorId: number, createChoiceDto: createChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
    updateChoice(choiceId: number, questionId: number, instructorId: number, updateChoiceDto: updateChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
    deleteChoice(choiceId: number, questionId: number, instructorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
}
