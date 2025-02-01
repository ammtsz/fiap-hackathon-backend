import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import {
  IStudent,
  ITeacher,
  IUser,
} from 'src/user/entities/models/user.interface';

@Injectable()
export class UserPGRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  async getTeacher(userId: number): Promise<ITeacher | null> {
    try {
      return this.userModel
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.teacherSubjects', 'teacherSubject')
        .leftJoinAndSelect('user.teacherGrades', 'teacherGrade')
        .leftJoinAndSelect('teacherSubject.subject', 'subject')
        .leftJoinAndSelect('teacherGrade.grade', 'grade')
        .where('user.id = :userId', { userId })
        .select([
          'user.id',
          'user.name',
          'user.role',
          'user.email',
          'teacherSubject.subjectId',
          'teacherGrade.gradeId',
        ])
        .getOne();
    } catch (error) {
      console.error('Error fetching teacher:', error);
      throw new InternalServerErrorException('Failed to fetch teacher');
    }
  }

  async getStudent(userId: number): Promise<IStudent | null> {
    try {
      return this.userModel
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.student', 'student')
        .where('user.id = :userId', { userId })
        .select([
          'user.id',
          'user.name',
          'user.role',
          'user.email',
          'student.gradeId',
          'student.classId',
          'student.yearId',
        ])
        .getOne();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw new InternalServerErrorException('Failed to fetch student');
    }
  }

  async getUser(email: string): Promise<IUser | null> {
    try {
      return this.userModel
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.name',
          'user.role',
          'user.password',
          'user.email',
        ])
        .where('(user.email ILIKE :email)', { email: `%${email}%` })
        .getOne();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }
}
