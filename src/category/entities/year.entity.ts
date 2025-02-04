import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';
import { Student } from '../../user/entities/student.entity';

@Entity('year')
export class Year {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.year)
  questionnaires: Questionnaire[];

  @OneToMany(() => Student, (student) => student.yearId)
  students: Student[];
}
