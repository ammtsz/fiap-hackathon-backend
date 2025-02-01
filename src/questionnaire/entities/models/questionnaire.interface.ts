export interface IQuestion {
  id: number;
  questionnaire_id: string;
  question: string;
  answer: boolean;
}

export interface IQuestionnaire {
  id: number;
  title: string;
  year_id: string;
  grade_id: string;
  subject_id: string;
  author_id: number;
  content: string;
  questions_amount?: number;
  class_id: string[];
  questions: IQuestion[];
}

export interface IStudentQuestionnaire extends IQuestionnaire {
  user_id: number;
  questionnaire_id: number;
  score: string;
  date: Date;
}
