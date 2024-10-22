import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware'; 
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';

@Controller('/api/quizzes')
@UseGuards(JwtMiddleware, RolesGuard) 
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Roles(Role.INSTRUCTOR)
  create(@Req() req: Request, @Body() createQuizDto: CreateQuizDto) {
    const instructorId = (req.user as User).id; 
    return this.quizzesService.createQuiz(createQuizDto, instructorId );
  }

  @Get()
  findAll() {
    return this.quizzesService.findAllQuizzes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findQuizById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.updateQuiz(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.removeQuiz(+id);
  }
}
