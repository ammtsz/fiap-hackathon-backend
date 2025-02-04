import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { QuestionnaireService } from '../services/questionnaire.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('questionnaire')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  async getQuestionnaires() {
    try {
      const questionnaire = await this.questionnaireService.getQuestionnaires();
      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('student/:id/scores')
  async getStudentScoresGroupedBySubject(@Param('id') id: number) {
    try {
      const questionnaire =
        await this.questionnaireService.getStudentScoresGroupedBySubject(id);
      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('student/:id')
  async getQuestionnairesByStudent(@Param('id') id: number) {
    try {
      const questionnaire =
        await this.questionnaireService.getQuestionnairesByStudent(id);
      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('teacher/:id')
  async getQuestionnairesByTeacher(@Param('id') id: number) {
    try {
      const questionnaire =
        await this.questionnaireService.getQuestionnairesByTeacher(id);
      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('student/:id/pending')
  async getPendingQuestionnairesByStudent(
    @Param('id') userId: number,
    @Query('year') yearId: string,
    @Query('grade') gradeId: string,
    @Query('class') classId: string,
  ) {
    try {
      const questionnaire =
        await this.questionnaireService.getPendingQuestionnairesByStudent(
          userId,
          yearId,
          gradeId,
          classId,
        );
      return questionnaire;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
