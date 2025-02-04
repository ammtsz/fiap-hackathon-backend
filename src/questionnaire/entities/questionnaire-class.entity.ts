import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Class } from '../../category/entities/class.entity';

@Entity()
export class QuestionnaireClass {
  @PrimaryColumn({ name: 'questionnaire_id' })
  questionnaireId: number;

  @PrimaryColumn({ name: 'class_id' })
  classId: string;

  @ManyToOne(
    () => Questionnaire,
    (questionnaire) => questionnaire.questionnaireClasses,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'questionnaire_id' })
  questionnaire: Questionnaire;

  @ManyToOne(() => Class, (classEntity) => classEntity.questionnaireClasses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  class: Class;
}
