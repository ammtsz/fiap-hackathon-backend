import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SubjectRepository } from '../subject.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../entities/subject.entity';
import { ICategory } from '../../entities/models/category.interface';

@Injectable()
export class SubjectPGRepository implements SubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private readonly categoryModel: Repository<Subject>,
  ) {}
  async findSubject(): Promise<ICategory[]> {
    try {
      return this.categoryModel
        .createQueryBuilder('subject')
        .select()
        .getMany();
    } catch (error) {
      console.error(`Error fetching subjects:`, error);
      throw new InternalServerErrorException(
        'Failed to fetch teacher subjects',
      );
    }
  }
}
