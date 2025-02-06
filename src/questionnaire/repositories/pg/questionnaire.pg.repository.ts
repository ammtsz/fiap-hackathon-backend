import { QuestionnaireRepository } from '../questionnaire.repository';
import { Questionnaire } from '../../entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IQuestion,
  IQuestionnaire,
  IQuestionnaireClass,
  IStudentQuestionnaire,
} from '../../entities/models/questionnaire.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';
import { QuestionnaireClass } from 'src/questionnaire/entities/questionnaire-class.entity';
import { Question } from 'src/questionnaire/entities/question.entity';
import { SaveQuestionnaireDto } from 'src/questionnaire/dto/save-questionnaire.dto';
import { SaveQuestionnaireClassDto } from 'src/questionnaire/dto/save-questionnaire-class.dto';
import { SaveQuestionDto } from 'src/questionnaire/dto/save-question.dto';

@Injectable()
export class QuestionnairePGRepository implements QuestionnaireRepository {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireModel: Repository<Questionnaire>,
    @InjectRepository(StudentQuestionnaire)
    private readonly studentQuestionnaireModel: Repository<StudentQuestionnaire>,
    @InjectRepository(QuestionnaireClass)
    private readonly questionnaireClassModel: Repository<QuestionnaireClass>,
    @InjectRepository(Question)
    private readonly questionModel: Repository<Question>,
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

  async getQuestionnaireById(id: number): Promise<IQuestionnaire | null> {
    return this.questionnaireModel.findOne({
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
      where: { id },
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
        'questionnaire.questionsAmount',
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
      .innerJoinAndSelect('questionnaire.subject', 'subject')
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
        'subject.id',
        'subject.label',
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

  async createQuestionnaire(
    questionnaire: SaveQuestionnaireDto,
  ): Promise<IQuestionnaire> {
    const newQuestionnaire = this.questionnaireModel.create(questionnaire);
    return this.questionnaireModel.save(newQuestionnaire);
  }

  async createQuestionnaireClass(
    questionnaireClass: SaveQuestionnaireClassDto[],
  ): Promise<IQuestionnaireClass[]> {
    const questionnaireClassEntity =
      this.questionnaireClassModel.create(questionnaireClass);
    return this.questionnaireClassModel.save(questionnaireClassEntity);
  }

  async deleteQuestionnaireClass(questionnaireId: number): Promise<void> {
    this.questionnaireClassModel.delete({
      questionnaire: { id: questionnaireId },
    });
  }

  async createQuestions(questions: SaveQuestionDto[]): Promise<IQuestion[]> {
    const questionsEntity = this.questionModel.create(questions);
    return this.questionModel.save(questionsEntity);
  }

  async deleteQuestionnaire(questionnaireId: number): Promise<void> {
    this.questionnaireModel.delete(questionnaireId);
  }

  async deleteQuestion(questionId: number): Promise<void> {
    this.questionModel.delete(questionId);
  }

  async countQuestionnaireQuestions(
    questionnaireId: number,
  ): Promise<number | null> {
    return this.questionModel
      .createQueryBuilder('question')
      .where('question.questionnaire_id = :questionnaireId', {
        questionnaireId,
      })
      .getCount();
  }

  async updateQuestionnaire(
    questionnaireId: number,
    updates: Partial<IQuestionnaire>,
  ): Promise<void> {
    this.questionnaireModel.update(questionnaireId, updates);
  }

  async updateQuestion(
    questionId: number,
    updatedQuestion: Partial<Question>,
  ): Promise<void> {
    await this.questionModel.update(questionId, updatedQuestion);
  }
}
