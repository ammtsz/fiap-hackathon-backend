import { User } from './user.entity';
import { Subject } from '../../category/entities/subject.entity';
import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity('teacher_subject')
export class TeacherSubject {
  @PrimaryColumn({ name: 'teacher_id' })
  teacherId: number;

  @PrimaryColumn({ name: 'subject_id' })
  subjectId: string;

  @ManyToOne(() => User, (user) => user.teacherSubjects)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @ManyToOne(() => Subject, (subject) => subject.teacherSubjects)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}
