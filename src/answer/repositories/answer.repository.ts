import { IAnswer } from '../entities/models/answer.interface';

export abstract class AnswerRepository {
  abstract getAnswersByQuestionnaire(
    questionnaireId: number,
  ): Promise<IAnswer[]>;

  abstract getAnswerCountsByQuestionnaire(
    questionnaireId: number,
  ): Promise<IAnswer[]>;

  abstract getAnswersByQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<IAnswer[]>;
}
