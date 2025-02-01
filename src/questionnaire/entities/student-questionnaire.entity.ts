import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';

@Entity()
export class StudentQuestionnaire {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  questionnaireId: number;

  @ManyToOne(
    () => Questionnaire,
    (questionnaire) => questionnaire.studentQuestionnaire,
  )
  questionnaire: Questionnaire;

  @Column()
  score: string;

  @Column()
  date: Date;
}
