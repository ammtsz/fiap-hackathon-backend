import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClassRepository } from '../class.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { ICategory } from '../../entities/models/category.interface';

@Injectable()
export class ClassPGRepository implements ClassRepository {
  constructor(
    @InjectRepository(Class)
    private readonly categoryModel: Repository<Class>,
  ) {}
  async findClass(): Promise<ICategory[]> {
    try {
      return this.categoryModel.createQueryBuilder('class').select().getMany();
    } catch (error) {
      console.error(`Error fetching classs:`, error);
      throw new InternalServerErrorException('Failed to fetch teacher classs');
    }
  }
}
