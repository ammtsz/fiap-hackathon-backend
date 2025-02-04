import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { AnswerRepository } from '../answer.repository';
import { IAnswer } from 'src/answer/entities/models/answer.interface';

@Injectable()
export class AnswerPGRepository implements AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async getAnswersByQuestionnaire(questionnaireId: number): Promise<IAnswer[]> {
    return this.answerRepository
      .createQueryBuilder('answers')
      .innerJoinAndSelect('answers.question', 'question')
      .innerJoinAndSelect('answers.user', 'user')
      .where('answers.questionnaire.id = :questionnaireId', { questionnaireId })
      .select([
        'answers.answer',
        'question.id',
        'question.question',
        'question.answer',
        'user.id',
        'user.name',
      ])
      .getMany();
  }

  async getAnswerCountsByQuestionnaire(questionnaireId: number) {
    return this.answerRepository
      .createQueryBuilder('answer')
      .select([
        'question.id AS question_id',
        'question.question AS question_text',
        'question.answer AS correct_answer',
        'COUNT(CASE WHEN answer.answer = true THEN 1 END) AS true_count',
        'COUNT(CASE WHEN answer.answer = false THEN 1 END) AS false_count',
      ])
      .innerJoin('answer.question', 'question')
      .where('answer.questionnaire.id = :questionnaireId', { questionnaireId })
      .groupBy('question.id')
      .addGroupBy('question.question')
      .addGroupBy('question.answer')
      .getRawMany();
  }

  async getAnswersByQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<IAnswer[]> {
    return this.answerRepository
      .createQueryBuilder('answers')
      .innerJoinAndSelect('answers.question', 'question')
      .innerJoinAndSelect('answers.user', 'user')
      .where('answers.questionnaire.id = :questionnaireId', { questionnaireId })
      .andWhere('answers.question.id = :questionId', { questionId })
      .select([
        'answers.answer',
        'question.id',
        'question.question',
        'question.answer',
        'user.id',
        'user.name',
      ])
      .getMany();
  }
}
