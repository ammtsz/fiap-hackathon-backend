import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Questionnaire } from './questionnaire.entity';
import { Subject } from '../../category/entities/subject.entity';

@Entity('student_questionnaire')
export class StudentQuestionnaire {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'questionnaire_id' })
  questionnaireId: number;

  @ManyToOne(() => User, (user) => user.studentQuestionnaires, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Questionnaire,
    (questionnaire) => questionnaire.studentQuestionnaires,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'questionnaire_id' })
  questionnaire: Questionnaire;

  @ManyToOne(() => Subject, (subject) => subject.studentQuestionnaires, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ type: 'varchar', length: 10 })
  score: string;

  @Column({ type: 'timestamp' })
  date: string;
}
