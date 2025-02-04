import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuestionnaireService } from '../services/questionnaire.service';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import {
  PostQuestionnaireDto,
  postQuestionnaireDto,
} from '../dto/post-questionnaire.dto';
import { PutQuestionnaireDto } from '../dto/put-questionnaire.dto';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Year } from 'src/category/entities/year.entity';
import { Grade } from 'src/category/entities/grade.entity';
import { Subject } from 'src/category/entities/subject.entity';

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

  @Get('/:id')
  async getQuestionnaireById(@Param('id') id: number) {
    try {
      return this.questionnaireService.getQuestionnaireById(id);
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

  @Post()
  async createQuestionnaire(
    @Body(new ZodValidationPipe(postQuestionnaireDto))
    questionnaire: PostQuestionnaireDto,
  ) {
    this.questionnaireService.createQuestionnaire(questionnaire);

    return { message: 'Questionnaire saved successfully' };
  }

  @Delete(':id')
  async deleteQuestionnaire(@Param('id') questionnaireId: number) {
    this.questionnaireService.deleteQuestionnaire(questionnaireId);

    return { message: 'Questionnaire deleted successfully' };
  }

  @Put('/:id')
  async updateQuestionnaire(
    @Param('id') questionnaireId: number,
    @Body() questionnaire: PutQuestionnaireDto,
  ) {
    const {
      title,
      yearId,
      gradeId,
      subjectId,
      content,
      questionsAmount,
      classes,
      questions,
    } = questionnaire;

    if (title || yearId || gradeId || subjectId || content || questionsAmount) {
      const updates: Partial<Questionnaire> = {};
      title && (updates.title = title);
      yearId && (updates.year = { id: yearId } as Year);
      gradeId && (updates.grade = { id: gradeId } as Grade);
      subjectId && (updates.subject = { id: subjectId } as Subject);
      content && (updates.content = content);
      questionsAmount && (updates.questionsAmount = questionsAmount);

      this.questionnaireService.updateQuestionnaire(questionnaireId, updates);
    }

    if (classes) {
      const updatedClasses = classes.map((c) => ({
        questionnaire: { id: questionnaireId },
        class: { id: c },
      }));

      await this.questionnaireService.deleteQuestionnaireClass(questionnaireId);
      await this.questionnaireService.createQuestionnaireClass(updatedClasses);
    }

    if (questions) {
      questions.forEach(({ id, question, answer }) => {
        this.questionnaireService.updateQuestion(id, { question, answer });
      });
    }

    return { message: 'Questionnaire updated successfully' };
  }

  @Put('/:questionnaireId/questions-amount')
  async updateQuestionnaireQuestionsAmount(
    @Param('questionnaireId') questionnaireId: number,
  ) {
    const questionnaire =
      await this.questionnaireService.getQuestionnaireById(questionnaireId);

    if (questionnaire) {
      const questionsAmount =
        (await this.questionnaireService.countQuestionnaireQuestions(
          questionnaireId,
        )) || 0;

      await this.questionnaireService.updateQuestionnaire(questionnaireId, {
        questionsAmount,
      });
    }
  }

  @Delete('/:questionnaireId/question/:questionId')
  async deleteQuestion(
    @Param('questionnaireId') questionnaireId: number,
    @Param('questionId') questionId: number,
  ) {
    await this.questionnaireService.deleteQuestion(questionId);

    await this.updateQuestionnaireQuestionsAmount(questionnaireId);

    return { message: 'Question deleted successfully' };
  }
}
