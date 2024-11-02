import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AutomaticQuestionDto, CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaClient) {}

  // Create a new question
  async createQuestion(quizId: number, createQuestionDto: CreateQuestionDto, instructorId: number) {
    const createQuestion = await this.prisma.question.create({
      data: {
        ...createQuestionDto,
        instructorId,
      },
    });
await this.prisma.quizQuestion.create({
  data:{
    quizId,
    questionId:createQuestion.id
  }
})
    return createQuestion;
  }

  async createOnlyQuestion( createQuestionDto: CreateQuestionDto, instructorId: number) {
    const createQuestion = await this.prisma.question.create({
      data: {
        ...createQuestionDto,
        instructorId,
      },
    });

    return createQuestion;
  }
  // Get all questions for a quiz
  async getQuestions(quizId: number, instructorId: number) {
    return this.prisma.question.findMany({
      where: {
        instructorId,
        
      },
    });
  }

  // Get a specific question by ID
  async getQuestionById(instructorId: number, questionId: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question || question.instructorId !== instructorId) {
      throw new NotFoundException('Question not found or does not belong to the instructor');
    }

    return question;
  }

  // Update a question
  async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, instructorId: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question || question.instructorId !== instructorId) {
      throw new NotFoundException('Question not found or does not belong to the instructor');
    }

    return this.prisma.question.update({
      where: { id: questionId },
      data: { ...updateQuestionDto },
    });
  }

  // Delete a question
  async deleteQuestion(questionId: number, instructorId: number) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question || question.instructorId !== instructorId) {
      throw new NotFoundException('Question not found or does not belong to the instructor');
    }

    return this.prisma.question.delete({
      where: { id: questionId },
    });
  }

  async automaticQuestion(quizId: number, automaticQuestionDto: AutomaticQuestionDto, instructorId: number) {
    const { numberOfQuestion } = automaticQuestionDto;

    const easyCount = Math.floor(numberOfQuestion * 0.4);
    const mediumCount = Math.floor(numberOfQuestion * 0.4);
    const hardCount = numberOfQuestion - easyCount - mediumCount;

    const easyQuestions = await this.prisma.question.findMany({
        where: { instructorId,level: 'Easy'},
    });

    const mediumQuestions = await this.prisma.question.findMany({
        where: {instructorId, level: 'Medium' },
    });

    const hardQuestions = await this.prisma.question.findMany({
        where: { instructorId,level: 'Hard' },
    });

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledEasy = shuffleArray(easyQuestions);
    const shuffledMedium = shuffleArray(mediumQuestions);
    const shuffledHard = shuffleArray(hardQuestions);

    const selectedQuestions = [
        ...shuffledEasy.slice(0, easyCount),
        ...shuffledMedium.slice(0, mediumCount),
        ...shuffledHard.slice(0, hardCount),
    ];

    for (const question of selectedQuestions) {
        await this.prisma.quizQuestion.create({
            data: {
                quizId,
                questionId: question.id,
            },
        });
    }

    return selectedQuestions;
}

}
