import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async findClass() {
    return this.categoryRepository.findClass();
  }

  async findGrade() {
    return this.categoryRepository.findGrade();
  }

  async findSubject() {
    return this.categoryRepository.findSubject();
  }

  async findYear() {
    return this.categoryRepository.findYear();
  }
}
