import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from '../repositories/questionnaire.repository';
import { PostQuestionnaireDto } from '../dto/post-questionnaire.dto';
import { SaveQuestionnaireDto } from '../dto/save-questionnaire.dto';
import { SaveQuestionnaireClassDto } from '../dto/save-questionnaire-class.dto';
import { SaveQuestionDto } from '../dto/save-question.dto';

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

  async createQuestionnaire(questionnaire: PostQuestionnaireDto) {
    const newQuestionnaire: SaveQuestionnaireDto = {
      title: questionnaire.title,
      content: questionnaire.content,
      questionsAmount: questionnaire.questionsAmount,
      year: { id: questionnaire.yearId },
      grade: { id: questionnaire.gradeId },
      subject: { id: questionnaire.subjectId },
      author: { id: questionnaire.authorId },
    };

    const questionnaireResponse =
      await this.questionnaireRepository.createQuestionnaire(newQuestionnaire);

    if (questionnaireResponse.id) {
      const questionnaireClasses: SaveQuestionnaireClassDto[] =
        questionnaire.classes.map((c) => ({
          questionnaire: { id: questionnaireResponse.id },
          class: { id: c },
        }));

      await this.questionnaireRepository.createQuestionnaireClass(
        questionnaireClasses,
      );

      const questions: SaveQuestionDto[] = questionnaire.questions.map((q) => ({
        questionnaire: { id: questionnaireResponse.id },
        question: q.question,
        answer: q.answer,
      }));
      await this.questionnaireRepository.createQuestions(questions);
    }
  }
}
