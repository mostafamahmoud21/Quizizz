import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaClient) { }

  async createQuestion(quizId: number, createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        quizId,
      },
    });
  }

  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async DeleteQues(id: number) {
    await this.prisma.choice.deleteMany({
      where: {
        questionId: id,
      },
    });

    return this.prisma.question.delete({
      where: { id },
    });
  }


  async findByQuiz(quizId: number) {
    return this.prisma.question.findMany({
      where: { quizId },
    });
  }
}



