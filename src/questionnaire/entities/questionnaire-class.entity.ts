import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class QuestionnaireClass {
  @PrimaryColumn()
  questionnaireId: number;

  @PrimaryColumn()
  classId: string;
}
