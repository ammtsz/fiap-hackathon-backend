import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from '../repositories/questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnairesRepository: QuestionnaireRepository,
  ) {}
}
