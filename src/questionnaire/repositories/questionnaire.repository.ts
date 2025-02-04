import { SaveQuestionDto } from '../dto/save-question.dto';
import { SaveQuestionnaireClassDto } from '../dto/save-questionnaire-class.dto';
import { SaveQuestionnaireDto } from '../dto/save-questionnaire.dto';
import {
  IQuestion,
  IQuestionnaire,
  IQuestionnaireClass,
  IStudentQuestionnaire,
} from '../entities/models/questionnaire.interface';

export abstract class QuestionnaireRepository {
  abstract getQuestionnaires(): Promise<IQuestionnaire[]>;
  abstract getQuestionnairesByStudent(
    userId: number,
  ): Promise<IStudentQuestionnaire[]>;

  abstract getQuestionnairesByTeacher(userId: number): Promise<any[]>;

  abstract getStudentScoresGroupedBySubject(userId: number): Promise<any[]>;
  abstract getPendingQuestionnairesByStudent(
    userId: number,
    yearId: string,
    gradeId: string,
    classId: string,
  ): Promise<any[]>;

  abstract createQuestionnaire(
    questionnaire: SaveQuestionnaireDto,
  ): Promise<IQuestionnaire>;

  abstract createQuestionnaireClass(
    questionnaireClass: SaveQuestionnaireClassDto[],
  ): Promise<IQuestionnaireClass[]>;

  abstract createQuestions(questions: SaveQuestionDto[]): Promise<IQuestion[]>;
}
