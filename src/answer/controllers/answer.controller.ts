import { Controller } from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
}
