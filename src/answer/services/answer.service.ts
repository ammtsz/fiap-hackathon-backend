import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '../repositories/answer.repository';

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
}
