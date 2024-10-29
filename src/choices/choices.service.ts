import { updateChoiceDto } from './dto/update-choice.dto';
import { PrismaService } from './../prisma/prisma.service';
import { createChoiceDto } from './dto/create-choice.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ChoicesService {
  constructor(private readonly PrismaService: PrismaService) {}

  //** adding choices to a question
  async createChoice(
    questionId: number,
    instructorId: number,
    createChoiceDto: createChoiceDto,
  ) {
    // check if question exist
    const question = await this.PrismaService.question.findUnique({
      where: { id: questionId },
    });
    if (!question)
      throw new NotFoundException(`Question with ID ${questionId} not found!`);

    // check quiz owner
    const quiz = await this.PrismaService.quiz.findUnique({
      where: { id: question.quizId },
    });
    if (quiz.instructorId !== instructorId) {
      throw new ForbiddenException(
        `You don't have permission to add choices to this quiz!`,
      );
    }

    // Create choice
    const choice = await this.PrismaService.choice.create({
      data: {
        ...createChoiceDto,
        questionId,
      },
    });

    // Send response
    return choice;
  }

  //** editing a choice
  async updateChoice(
    choiceId: number,
    questionId: number,
    instructorId: number,
    updateChoiceDto: updateChoiceDto,
  ) {
    // check if choice exist
    const choice = await this.PrismaService.choice.findUnique({
      where: { id: choiceId },
    });
    if (!choice)
      throw new NotFoundException(`Choice with ID ${choiceId} not found!`);

    // check if question exist
    const question = await this.PrismaService.question.findUnique({
      where: { id: questionId },
    });
    if (!question)
      throw new NotFoundException(`Question with ID ${questionId} not found!`);

    // check quiz owner
    const quiz = await this.PrismaService.quiz.findUnique({
      where: { id: question.quizId },
    });
    if (quiz.instructorId !== instructorId)
      throw new ForbiddenException(`You don't have permission to edit this choices!`,);

    // Update choice
    const updatedChoice = await this.PrismaService.choice.update({
      where: { id: choiceId },
      data: updateChoiceDto,
    });

    // Send response
    return updatedChoice;
  }

    //** delete a choice
    async deleteChoice(
        choiceId: number,
        questionId: number,
        instructorId: number,
      ) {
        // check if choice exist
        const choice = await this.PrismaService.choice.findUnique({
          where: { id: choiceId },
        });
        if (!choice)
          throw new NotFoundException(`Choice with ID ${choiceId} not found!`);

        // check if question exist
        const question = await this.PrismaService.question.findUnique({
          where: { id: questionId },
        });
        if (!question)
          throw new NotFoundException(`Question with ID ${questionId} not found!`);

        // check quiz owner
        const quiz = await this.PrismaService.quiz.findUnique({
          where: { id: question.quizId },
        });
        if (quiz.instructorId !== instructorId)
          throw new ForbiddenException(`You don't have permission to delete this choice!`,);

        // delete choice
        const deletedChoice = await this.PrismaService.choice.delete({
          where: { id: choiceId }
        });

        // Send response
        return deletedChoice;
      }
}
