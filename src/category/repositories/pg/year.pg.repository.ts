import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { YearRepository } from '../year.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Year } from '../../entities/year.entity';
import { ICategory } from '../../entities/models/category.interface';

@Injectable()
export class YearPGRepository implements YearRepository {
  constructor(
    @InjectRepository(Year)
    private readonly categoryModel: Repository<Year>,
  ) {}
  async findYear(): Promise<ICategory[]> {
    try {
      return this.categoryModel.createQueryBuilder('year').select().getMany();
    } catch (error) {
      console.error(`Error fetching years:`, error);
      throw new InternalServerErrorException(
        'Failed to fetch teacher subjects',
      );
    }
  }
}
