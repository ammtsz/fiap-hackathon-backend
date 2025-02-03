import { User } from '../../../user/entities/user.entity';
import { ICategory } from '../../../category/entities/models/category.interface';

export interface IQuestion {
  id: number;
  question: string;
  answer: boolean;
  questionnaireId: IQuestionnaire;
}

export interface IQuestionnaire {
  id: number;
  title: string;
  content: string;
  questionsAmount?: number;
  year: ICategory;
  grade: ICategory;
  subject: ICategory;
  author: User;
  classes: ICategory[];
  questions: IQuestion[];
}

export interface IStudentQuestionnaire {
  userId: number;
  questionnaireId: number;
  score: string;
  date: Date;
  questionnaire: IQuestionnaire;
}
