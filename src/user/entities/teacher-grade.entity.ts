import { User } from './user.entity';
import { Grade } from '../../category/entities/grade.entity';
import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity('teacher_grade')
export class TeacherGrade {
  @PrimaryColumn({ name: 'teacher_id' })
  teacherId: number;

  @PrimaryColumn({ name: 'grade_id' })
  gradeId: string;

  @ManyToOne(() => User, (user) => user.teacherGrades)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @ManyToOne(() => Grade, (grade) => grade.teacherGrades)
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;
}
