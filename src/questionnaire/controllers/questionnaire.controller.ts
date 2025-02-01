import { Controller } from '@nestjs/common';
import { QuestionnaireService } from '../services/questionnaire.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('questionnaire')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnairesService: QuestionnaireService) {}
}
