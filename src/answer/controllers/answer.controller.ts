import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import {
  postStudentAnswerDto,
  PostStudentAnswerDto,
} from '../dto/post-student-answer.dto';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';

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

  @Post()
  async saveStudentQuestionnaireAnswers(
    @Body(new ZodValidationPipe(postStudentAnswerDto))
    answers: PostStudentAnswerDto,
  ) {
    try {
      const isAnswered = await this.answerService.getStudentQuestionnaire(
        answers.user_id,
        answers.questionnaire_id,
      );

      if (isAnswered) {
        throw new ConflictException(
          'Student has already answered this questionnaire',
        );
      }

      this.answerService.saveStudentQuestionnaireAnswers(answers);

      return { message: 'Student answers saved successfully' };
    } catch (err) {
      if (err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to save student answers');
    }
  }
}
