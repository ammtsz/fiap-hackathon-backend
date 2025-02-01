import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';

@Entity()
export class QuestionnaireClass {
  @PrimaryColumn()
  questionnaireId: number;

  @PrimaryColumn()
  classId: string;

  @ManyToOne(
    () => Questionnaire,
    (questionnaire) => questionnaire.questionnaireClasses,
  )
  questionnaire: Questionnaire;
}
