import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { TeacherSubject } from '../../user/entities/teacher-subject.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';

@Entity('subject')
export class Subject {
  @PrimaryColumn()
  id: string;

  @Column({ length: 50 })
  label: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject)
  teacherSubjects: TeacherSubject[];

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.subject)
  questionnaires: Questionnaire[];

  @OneToMany(
    () => StudentQuestionnaire,
    (studentQuestionnaire) => studentQuestionnaire.subject,
  )
  studentQuestionnaires: StudentQuestionnaire[];
}
