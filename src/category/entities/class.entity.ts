import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../../user/entities/student.entity';

@Entity()
export class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @OneToMany(() => Student, (student) => student.classId)
  students: Student[];
}
