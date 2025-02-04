import { User } from '../../../user/entities/user.entity';
import { Questionnaire } from '../questionnaire.entity';
import { Class } from 'src/category/entities/class.entity';
import { Year } from 'src/category/entities/year.entity';
import { Grade } from 'src/category/entities/grade.entity';
import { Subject } from 'src/category/entities/subject.entity';

export interface IQuestion {
  id: number;
  question: string;
  answer: boolean;
  questionnaire: IQuestionnaire;
}

export interface IQuestionnaire {
  id: number;
  title: string;
  content: string;
  questionsAmount: number;
  year: Year;
  grade: Grade;
  subject: Subject;
  author: User;
  classes: Class[];
  questions: IQuestion[];
}

export interface IStudentQuestionnaire {
  userId: number;
  questionnaireId: number;
  subject: Subject;
  score: string;
  date: string;
}

export interface IQuestionnaireClass {
  questionnaire: Questionnaire;
  class: Class;
}
