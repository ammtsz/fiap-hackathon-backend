import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GradeRepository } from '../grade.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../entities/grade.entity';
import { ICategory } from '../../entities/models/category.interface';

@Injectable()
export class GradePGRepository implements GradeRepository {
  constructor(
    @InjectRepository(Grade)
    private readonly categoryModel: Repository<Grade>,
  ) {}
  async findGrade(): Promise<ICategory[]> {
    try {
      return this.categoryModel.createQueryBuilder('grade').select().getMany();
    } catch (error) {
      console.error(`Error fetching grades:`, error);
      throw new InternalServerErrorException(
        'Failed to fetch teacher subjects',
      );
    }
  }
}
