import { PrismaService } from './../prisma/prisma.service';
import { createChoiceDto } from './dto/create-choice.dto';
export declare class ChoicesService {
    private readonly PrismaService;
    constructor(PrismaService: PrismaService);
    createChoice(questionId: number, createChoiceDto: createChoiceDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        questionId: number;
    }>;
}
