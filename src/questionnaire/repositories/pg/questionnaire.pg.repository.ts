import { QuestionnaireRepository } from '../questionnaire.repository';
import { Questionnaire } from '../../entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class QuestionnairePGRepository implements QuestionnaireRepository {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnairesModel: Repository<Questionnaire>,
  ) {}
}
