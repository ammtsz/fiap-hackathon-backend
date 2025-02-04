import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repositories/answer.repository';
import { PostStudentAnswerDto } from '../dto/post-student-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async getAnswersByQuestionnaire(questionnaireId: number) {
    return this.answerRepository.getAnswersByQuestionnaire(questionnaireId);
  }

  async getAnswerCountsByQuestionnaire(questionnaireId: number) {
    return this.answerRepository.getAnswerCountsByQuestionnaire(
      questionnaireId,
    );
  }

  async getAnswersByQuestion(questionnaireId: number, questionId: number) {
    return this.answerRepository.getAnswersByQuestion(
      questionnaireId,
      questionId,
    );
  }

  async getStudentQuestionnaire(userId: number, questionnaireId: number) {
    return this.answerRepository.getStudentQuestionnaire(
      userId,
      questionnaireId,
    );
  }

  async saveStudentQuestionnaireAnswers(answers: PostStudentAnswerDto) {
    const studentAnswers = answers.answers.map((answer) => ({
      questionnaire: { id: answers.questionnaire_id },
      question: { id: answer.question_id },
      user: { id: answers.user_id },
      answer: answer.answer,
    }));
    await this.answerRepository.saveAnswers(studentAnswers);

    const studentQuestionnaire = {
      userId: answers.user_id,
      questionnaireId: answers.questionnaire_id,
      subject: { id: answers.subject_id },
      score: answers.score,
      date: new Date().toISOString(),
    };
    await this.answerRepository.saveStudentQuestionnaire(studentQuestionnaire);
  }
}
