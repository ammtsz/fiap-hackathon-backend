import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Student } from '../../user/entities/student.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { QuestionnaireClass } from 'src/questionnaire/entities/questionnaire-class.entity';

@Entity('class')
export class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @OneToMany(() => Student, (student) => student.classId)
  students: Student[];

  @ManyToMany(() => Questionnaire, (questionnaire) => questionnaire.classes)
  questionnaires: Questionnaire[];

  @OneToMany(() => QuestionnaireClass, (qc) => qc.class)
  questionnaireClasses: QuestionnaireClass[];
}
