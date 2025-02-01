import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Year } from '../../category/entities/year.entity';

import { Question } from './question.entity';
import { QuestionnaireClass } from './questionnaire-class.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { StudentQuestionnaire } from './student-questionnaire.entity';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Year, (year) => year.questionnaires)
  year: Year;

  @Column()
  content: string;

  @Column()
  questionsAmount: number;

  @OneToMany(() => Question, (question) => question.questionnaire)
  questions: Question[];

  @OneToMany(
    () => QuestionnaireClass,
    (questionnaireClass) => questionnaireClass.questionnaire,
  )
  questionnaireClasses: QuestionnaireClass[];

  @OneToMany(() => Answer, (answer) => answer.questionnaire)
  answers: Answer[];

  @OneToMany(
    () => StudentQuestionnaire,
    (studentQuestionnaire) => studentQuestionnaire.questionnaire,
  )
  studentQuestionnaire: StudentQuestionnaire[];
}
