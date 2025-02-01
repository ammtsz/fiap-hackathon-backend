import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @Column({ name: 'grade_id' })
  gradeId: string;

  @Column({ name: 'class_id' })
  classId: string;

  @Column({ name: 'year_id' })
  yearId: string;

  @ManyToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
