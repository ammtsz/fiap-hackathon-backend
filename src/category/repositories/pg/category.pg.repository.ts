import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { ICategory } from '../../entities/models/category.interface';
import { Grade } from 'src/category/entities/grade.entity';
import { Subject } from 'src/category/entities/subject.entity';
import { Year } from 'src/category/entities/year.entity';

@Injectable()
export class CategoryPGRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Class)
    private readonly classModel: Repository<ICategory>,
    @InjectRepository(Grade)
    private readonly gradeModel: Repository<ICategory>,
    @InjectRepository(Subject)
    private readonly subjectModel: Repository<ICategory>,
    @InjectRepository(Year)
    private readonly yearModel: Repository<ICategory>,
  ) {}
  async findClass(): Promise<ICategory[]> {
    try {
      return this.classModel.createQueryBuilder('class').select().getMany();
    } catch (error) {
      console.error(`Error fetching class:`, error);
      throw new InternalServerErrorException('Failed to fetch classes');
    }
  }

  async findGrade(): Promise<ICategory[]> {
    try {
      return this.gradeModel.createQueryBuilder('grade').select().getMany();
    } catch (error) {
      console.error(`Error fetching class:`, error);
      throw new InternalServerErrorException('Failed to fetch grades');
    }
  }

  async findSubject(): Promise<ICategory[]> {
    try {
      return this.subjectModel.createQueryBuilder('subject').select().getMany();
    } catch (error) {
      console.error(`Error fetching subjects:`, error);
      throw new InternalServerErrorException('Failed to fetch subjects');
    }
  }

  async findYear(): Promise<ICategory[]> {
    try {
      return this.yearModel.createQueryBuilder('year').select().getMany();
    } catch (error) {
      console.error(`Error fetching years:`, error);
      throw new InternalServerErrorException('Failed to fetch teacher years');
    }
  }
}
