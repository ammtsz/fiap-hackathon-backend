import { Controller, Get, Param } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('questionnaire/:questionnaireId')
  async getAnswersByQuestionnaire(
    @Param('questionnaireId') questionnaireId: number,
  ) {
    return this.answerService.getAnswersByQuestionnaire(questionnaireId);
  }

  @Get('questionnaire/:questionnaireId/counts')
  async getAnswerCountsByQuestionnaire(
    @Param('questionnaireId') questionnaireId: number,
  ) {
    return this.answerService.getAnswerCountsByQuestionnaire(questionnaireId);
  }

  @Get('questionnaire/:questionnaireId/question/:questionId')
  async getAnswersByQuestion(
    @Param('questionnaireId') questionnaireId: number,
    @Param('questionId') questionId: number,
  ) {
    return this.answerService.getAnswersByQuestion(questionnaireId, questionId);
  }
}
