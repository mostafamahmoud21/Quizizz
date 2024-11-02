import { Body, Controller, Param, ParseIntPipe, Post, Delete, Put, Get, UseGuards, Req, UsePipes } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AutomaticQuestionDto, CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';
import { NotFoundGuard } from './guards/not-found';
import { ValidationPipe } from './pipes/numeric-id.pipe';
import { NotFoundGuardqQuestions } from './guards/not-found-questions';

@Controller('/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // Create a question
  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.createQuestion(quizId, createQuestionDto, instructorId);
  }

  // Create only a question
  @Post('only')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
 
  async createWithoutQuiz(
    @Req() req: Request,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.createOnlyQuestion(createQuestionDto, instructorId);
  }

  // Get all questions for a quiz
  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuard)
  @UsePipes(ValidationPipe)
  async findAll(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Req() req: Request
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.getQuestions(quizId, instructorId);
  }

  // Get a specific question by ID
  @Get(':questionId')
  @UseGuards(JwtMiddleware, RolesGuard, NotFoundGuardqQuestions)
  @Roles(Role.INSTRUCTOR)
  @UsePipes(ValidationPipe)
  async findOne(
    @Req() req: Request,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.getQuestionById(instructorId, questionId);
  }

  // Update a question
  @Put(':questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuardqQuestions)
  @UsePipes(ValidationPipe)
  async update(
    @Req() req: Request,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.updateQuestion(questionId, updateQuestionDto, instructorId);
  }

  // Delete a question
  @Delete(':questionId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuardqQuestions)
  @UsePipes(ValidationPipe)
  async remove(
    @Req() req: Request,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.deleteQuestion(questionId, instructorId);
  }

  // Create an automatic question
  @Post('automatic/:quizId')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  // @UseGuards(NotFoundGuard)
  // @UsePipes(ValidationPipe)
  async createAutomatic(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() automaticQuestionDto: AutomaticQuestionDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.questionsService.automaticQuestion(quizId, automaticQuestionDto, instructorId);
  }
}
