import { ICategory } from '../entities/models/category.interface';

export abstract class ClassRepository {
  abstract findClass(): Promise<ICategory[]>;
}
