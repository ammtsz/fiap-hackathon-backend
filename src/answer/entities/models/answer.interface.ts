import {
  IQuestion,
  IQuestionnaire,
} from 'src/questionnaire/entities/models/questionnaire.interface';
import { IUser } from 'src/user/entities/models/user.interface';

export interface IAnswer {
  id: number;
  questionnaire: IQuestionnaire;
  question: IQuestion;
  user: IUser;
  answer?: boolean;
}
