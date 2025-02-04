import {
  IQuestionnaire,
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
}
