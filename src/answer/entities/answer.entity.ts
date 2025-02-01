import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';
import { Question } from '../../questionnaire/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.answers)
  questionnaire: Questionnaire;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;

  @Column()
  answer: boolean;
}
