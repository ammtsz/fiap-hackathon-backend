import { QuestionnaireRepository } from '../questionnaire.repository';
import { Questionnaire } from '../../entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IQuestionnaire,
  IStudentQuestionnaire,
} from '../../entities/models/questionnaire.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';

@Injectable()
export class QuestionnairePGRepository implements QuestionnaireRepository {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireModel: Repository<Questionnaire>,
    @InjectRepository(StudentQuestionnaire)
    private readonly studentQuestionnaireModel: Repository<StudentQuestionnaire>,
  ) {}

  async getQuestionnaires(): Promise<IQuestionnaire[]> {
    return this.questionnaireModel.find({
      relations: ['year', 'grade', 'subject', 'author', 'classes', 'questions'],
      select: {
        id: true,
        title: true,
        content: true,
        questionsAmount: true,
        year: {
          id: true,
          label: true,
        },
        grade: {
          id: true,
          label: true,
        },
        subject: {
          id: true,
          label: true,
        },
        author: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
        classes: {
          id: true,
          label: true,
        },
        questions: {
          id: true,
          question: true,
          answer: true,
        },
      },
    });
  }

  async getQuestionnairesByStudent(
    userId: number,
  ): Promise<IStudentQuestionnaire[]> {
    return this.studentQuestionnaireModel
      .createQueryBuilder('sq')
      .innerJoinAndSelect('sq.questionnaire', 'questionnaire')
      .innerJoinAndSelect('questionnaire.year', 'year')
      .innerJoinAndSelect('questionnaire.subject', 'subject')
      .innerJoinAndSelect('questionnaire.author', 'author')
      .where('sq.userId = :userId', { userId })
      .select([
        'sq.userId',
        'sq.questionnaireId',
        'sq.score',
        'sq.date',
        'questionnaire.title',
        'year.id',
        'year.label',
        'subject.id',
        'subject.label',
        'author.name',
      ])
      .orderBy('sq.date', 'DESC')
      .getMany();
  }

  async getQuestionnairesByTeacher(
    teacherId: number,
  ): Promise<IQuestionnaire[]> {
    return this.questionnaireModel
      .createQueryBuilder('questionnaire')
      .innerJoinAndSelect('questionnaire.year', 'year')
      .innerJoinAndSelect('questionnaire.grade', 'grade')
      .innerJoinAndSelect('questionnaire.classes', 'class')
      .where('questionnaire.author.id = :teacherId', { teacherId })
      .select([
        'questionnaire.id',
        'questionnaire.title',
        'questionnaire.content',
        'questionnaire.questionsAmount',
        'year.id',
        'year.label',
        'grade.id',
        'grade.label',
        'class.id',
        'class.label',
      ])
      .getMany();
  }

  async getStudentScoresGroupedBySubject(userId: number) {
    return this.studentQuestionnaireModel
      .createQueryBuilder('sq')
      .select([
        'subject.id AS subjectId',
        'subject.label AS subjectName',
        'AVG(CAST(sq.score AS INT)) AS totalScore',
      ])
      .innerJoin('sq.questionnaire', 'questionnaire')
      .innerJoin('questionnaire.subject', 'subject')
      .where('sq.userId = :userId', { userId })
      .groupBy('subject.id')
      .addGroupBy('subject.label')
      .getRawMany();
  }

  async getPendingQuestionnairesByStudent(
    userId: number,
    yearId: string,
    gradeId: string,
    classId: string,
  ) {
    try {
      return this.questionnaireModel
        .createQueryBuilder('q')
        .innerJoin('q.year', 'y')
        .innerJoin('q.grade', 'g')
        .innerJoin('q.subject', 's')
        .innerJoin('q.author', 'a')
        .innerJoin('q.classes', 'c')
        .where('y.id = :yearId', { yearId })
        .andWhere('g.id = :gradeId', { gradeId })
        .andWhere('c.id = :classId', { classId })
        .andWhere(
          (qb) => {
            const subQuery = qb
              .subQuery()
              .select('1')
              .from('student_questionnaire', 'sq')
              .where('sq.questionnaire_id = q.id')
              .andWhere('sq.user_id = :userId')
              .getQuery();
            return 'NOT EXISTS ' + subQuery;
          },
          { userId },
        )
        .addSelect(['s.label', 'a.name'])
        .getMany();
    } catch (error) {
      console.error('Error fetching pending questionnaires:', error);
      throw new InternalServerErrorException('Failed to fetch teacher');
    }
  }
}
