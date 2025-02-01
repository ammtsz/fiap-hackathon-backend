import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { TeacherSubject } from '../../user/entities/teacher-subject.entity';

@Entity('subject')
export class Subject {
  @PrimaryColumn()
  id: string;

  @Column({ length: 50 })
  label: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject)
  teacherSubjects: TeacherSubject[];
}
