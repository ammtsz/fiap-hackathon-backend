import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';
import { SaveAnswerDto } from '../dto/save-answer.dto';
import { SaveStudentQuestionnaireDto } from '../dto/save-student-questionnaire.dto';
import { IAnswer } from '../entities/models/answer.interface';

export abstract class AnswerRepository {
  abstract getAnswersByQuestionnaire(
    questionnaireId: number,
  ): Promise<IAnswer[]>;

  abstract getAnswerCountsByQuestionnaire(
    questionnaireId: number,
  ): Promise<any[]>;

  abstract getAnswersByQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<IAnswer[]>;

  abstract saveAnswers(answers: SaveAnswerDto[]): Promise<IAnswer[]>;

  abstract saveStudentQuestionnaire(
    studentQuestionnaire: SaveStudentQuestionnaireDto,
  ): Promise<StudentQuestionnaire>;

  abstract getStudentQuestionnaire(
    userId: number,
    questionnaireId: number,
  ): Promise<StudentQuestionnaire | null>;
}
