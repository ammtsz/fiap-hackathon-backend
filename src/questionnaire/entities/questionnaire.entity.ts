import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Year } from '../../category/entities/year.entity';
import { Grade } from '../../category/entities/grade.entity';
import { Subject } from '../../category/entities/subject.entity';
import { Class } from '../../category/entities/class.entity';
import { Question } from './question.entity';
import { StudentQuestionnaire } from './student-questionnaire.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Entity('questionnaire')
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'questions_amount', type: 'int', nullable: true })
  questionsAmount: number;

  @ManyToOne(() => Year, (year) => year.questionnaires, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'year_id' })
  year: Year;

  @ManyToOne(() => Grade, (grade) => grade.questionnaires, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;

  @ManyToOne(() => Subject, (subject) => subject.questionnaires, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => User, (user) => user.questionnaires, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToMany(() => Class)
  @JoinTable({
    name: 'questionnaire_class',
    joinColumn: { name: 'questionnaire_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
  })
  classes: Class[];

  @OneToMany(() => Question, (question) => question.questionnaireId, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(
    () => StudentQuestionnaire,
    (studentQuestionnaire) => studentQuestionnaire.questionnaire,
  )
  studentQuestionnaires: StudentQuestionnaire[];

  @OneToMany(() => Answer, (answer) => answer.questionnaire)
  answers: Answer[];
}
