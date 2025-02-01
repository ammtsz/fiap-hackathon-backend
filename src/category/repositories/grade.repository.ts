import { ICategory } from '../entities/models/category.interface';

export abstract class GradeRepository {
  abstract findGrade(): Promise<ICategory[]>;
}
