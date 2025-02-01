import { ICategory } from '../entities/models/category.interface';

export abstract class YearRepository {
  abstract findYear(): Promise<ICategory[]>;
}
