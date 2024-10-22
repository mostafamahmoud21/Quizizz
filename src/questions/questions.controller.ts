import { Body, Controller, Param, ParseIntPipe, Post ,Delete,Put,Get, UseGuards} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question-dto';
import { UpdateQuestionDto } from './dto/create-question-dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('quizzes/:quizId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async createQuestion  (
    @Param('quizId') quizId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.createQuestion(+quizId, createQuestionDto);
  }

  @Put('updatedQuestion')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(+id, updateQuestionDto);
  }

  @Delete('Deletedquestion')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async DeleteQuestion(@Param('id',ParseIntPipe) id: number) {
    return this.questionsService.DeleteQues(+id);
  }

  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  async QuestionWithQuizId(@Param('quizId',ParseIntPipe) quizId: number) {
    return this.questionsService.findByQuiz(quizId);
  }


}