import { ICategory } from '../entities/models/category.interface';

export abstract class SubjectRepository {
  abstract findSubject(): Promise<ICategory[]>;
}
