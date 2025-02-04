import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TeacherSubject } from './teacher-subject.entity';
import { TeacherGrade } from './teacher-grade.entity';
import { Student } from './student.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  role: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50 })
  email: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.teacher)
  teacherSubjects: TeacherSubject[];

  @OneToMany(() => TeacherGrade, (teacherGrade) => teacherGrade.teacher)
  teacherGrades: TeacherGrade[];

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.author)
  questionnaires: Questionnaire[];

  @OneToMany(
    () => StudentQuestionnaire,
    (studentQuestionnaire) => studentQuestionnaire.user,
  )
  studentQuestionnaires: StudentQuestionnaire[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];
}
