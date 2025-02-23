import { Module } from '@nestjs/common';
import { AnswerService } from './services/answer.service';
import { AnswerController } from './controllers/answer.controller';
import { AnswerRepository } from './repositories/answer.repository';
import { AnswerPGRepository } from './repositories/pg/answer.pg.repository';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentQuestionnaire } from '../questionnaire/entities/student-questionnaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, StudentQuestionnaire])],
  providers: [
    {
      provide: AnswerRepository,
      useClass: AnswerPGRepository,
    },
    AnswerService,
  ],
  controllers: [AnswerController],
})
export class AnswerModule {}
