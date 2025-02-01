import { IStudent, ITeacher, IUser } from '../entities/models/user.interface';

export abstract class UserRepository {
  abstract getTeacher(userId: number): Promise<ITeacher | null>;
  abstract getStudent(userId: number): Promise<IStudent | null>;
  abstract getUser(email: string): Promise<IUser | null>;
}
