import { Answer } from '../../entities/answer.entity';
import { AnswerRepository } from '../answer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AnswerPGRepository implements AnswerRepository {
  constructor(
    @InjectRepository(Answer) private answerModel: Repository<Answer>,
  ) {}
}
