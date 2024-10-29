import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { createChoiceDto } from './dto/create-choice.dto';
import { updateChoiceDto } from './dto/update-choice.dto';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/interfaces/user.interface';
import { Request } from 'express';
import { NotFoundGuardqChoice } from './guards/not-found-choice';
import { ValidationPipe } from './pipes/numeric-id.pipe';
import { NotFoundGuardqQuestions } from './guards/not-found-questions';

@Controller('questions')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  //** adding choices to a question
  @Post(':questionId/choices')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuardqQuestions)
  @UsePipes(ValidationPipe)
  async createChoice(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
    @Body() createChoiceDto: createChoiceDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.choicesService.createChoice(
      questionId,
      instructorId,
      createChoiceDto,
    );
  }
  //** editing a choice
  @Put(':questionId/choices/:id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuardqQuestions,NotFoundGuardqChoice)
  @UsePipes(ValidationPipe)
  async updateChoice(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() updateChoiceDto: updateChoiceDto,
  ) {
    const instructorId = (req.user as User).id;
    return this.choicesService.updateChoice(
      id,
      questionId,
      instructorId,
      updateChoiceDto,
    );
  }

  //** delete a choice
  @Delete(':questionId/choices/:id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @UseGuards(NotFoundGuardqQuestions,NotFoundGuardqChoice)
  @UsePipes(ValidationPipe)
  async deleteChoice(
    @Param('id', ParseIntPipe) id: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Req() req: Request,
  ) {
    const instructorId = (req.user as User).id;
    return this.choicesService.deleteChoice(id, questionId, instructorId);
  }
}