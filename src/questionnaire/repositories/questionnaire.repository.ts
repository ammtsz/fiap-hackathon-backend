import { SaveQuestionDto } from '../dto/save-question.dto';
import { SaveQuestionnaireClassDto } from '../dto/save-questionnaire-class.dto';
import { SaveQuestionnaireDto } from '../dto/save-questionnaire.dto';
import {
  IQuestion,
  IQuestionnaire,
  IQuestionnaireClass,
  IStudentQuestionnaire,
} from '../entities/models/questionnaire.interface';
import { Question } from '../entities/question.entity';

export abstract class QuestionnaireRepository {
  abstract getQuestionnaires(): Promise<IQuestionnaire[]>;

  abstract getQuestionnaireById(id: number): Promise<IQuestionnaire | null>;

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

  abstract deleteQuestionnaireClass(questionnaireId: number): Promise<void>;

  abstract createQuestions(questions: SaveQuestionDto[]): Promise<IQuestion[]>;

  abstract deleteQuestionnaire(questionnaireId: number): Promise<void>;

  abstract deleteQuestion(questionId: number): Promise<void>;

  abstract countQuestionnaireQuestions(
    questionnaireId: number,
  ): Promise<number | null>;

  abstract updateQuestionnaire(
    questionnaireId: number,
    updates: Partial<IQuestionnaire>,
  ): Promise<void>;

  abstract updateQuestion(
    questionId: number,
    updatedQuestion: Partial<Question>,
  ): Promise<void>;
}
