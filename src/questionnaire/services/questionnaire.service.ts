import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from '../repositories/questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) {}

  async getQuestionnaires() {
    return this.questionnaireRepository.getQuestionnaires();
  }

  async getQuestionnairesByStudent(userId: number) {
    return this.questionnaireRepository.getQuestionnairesByStudent(userId);
  }

  async getQuestionnairesByTeacher(userId: number) {
    return this.questionnaireRepository.getQuestionnairesByTeacher(userId);
  }

  async getStudentScoresGroupedBySubject(userId: number) {
    return this.questionnaireRepository.getStudentScoresGroupedBySubject(
      userId,
    );
  }

  async getPendingQuestionnairesByStudent(
    userId: number,
    yearId: string,
    gradeId: string,
    classId: string,
  ) {
    return this.questionnaireRepository.getPendingQuestionnairesByStudent(
      userId,
      yearId,
      gradeId,
      classId,
    );
  }
}
