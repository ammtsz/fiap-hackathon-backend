import { ICategory } from '../entities/models/category.interface';

export abstract class CategoryRepository {
  abstract findClass(): Promise<ICategory[]>;
  abstract findGrade(): Promise<ICategory[]>;
  abstract findSubject(): Promise<ICategory[]>;
  abstract findYear(): Promise<ICategory[]>;
}
