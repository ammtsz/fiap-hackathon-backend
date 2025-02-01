import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { TeacherGrade } from '../../user/entities/teacher-grade.entity';
@Entity('grade')
export class Grade {
  @PrimaryColumn()
  id: string;

  @Column({ length: 50 })
  label: string;

  @OneToMany(() => TeacherGrade, (teacherGrade) => teacherGrade.grade)
  teacherGrades: TeacherGrade[];
}
