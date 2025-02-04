import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { AnswerRepository } from '../answer.repository';
import { IAnswer } from '../../entities/models/answer.interface';
import { SaveAnswerDto } from '../../dto/save-answer.dto';
import { SaveStudentQuestionnaireDto } from '../../dto/save-student-questionnaire.dto';
import { StudentQuestionnaire } from '../../../questionnaire/entities/student-questionnaire.entity';

@Injectable()
export class AnswerPGRepository implements AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly answerModel: Repository<Answer>,
    @InjectRepository(StudentQuestionnaire)
    private readonly studentQuestionnaireModel: Repository<StudentQuestionnaire>,
  ) {}

  async getAnswersByQuestionnaire(questionnaireId: number): Promise<IAnswer[]> {
    return this.answerModel
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
    return this.answerModel
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
    return this.answerModel
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

  async saveAnswers(answers: SaveAnswerDto[]): Promise<IAnswer[]> {
    const answerEntities = this.answerModel.create(answers);
    return await this.answerModel.save(answerEntities);
  }

  async getStudentQuestionnaire(
    userId: number,
    questionnaireId: number,
  ): Promise<StudentQuestionnaire | null> {
    return this.studentQuestionnaireModel.findOne({
      relations: ['user', 'questionnaire'],
      where: { userId, questionnaireId },
    });
  }

  async saveStudentQuestionnaire(
    studentQuestionnaire: SaveStudentQuestionnaireDto,
  ): Promise<StudentQuestionnaire> {
    const studentQuestionnaireEntity =
      this.studentQuestionnaireModel.create(studentQuestionnaire);
    return await this.studentQuestionnaireModel.save(
      studentQuestionnaireEntity,
    );
  }
}
