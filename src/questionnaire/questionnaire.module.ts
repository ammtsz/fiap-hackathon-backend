import { Module } from '@nestjs/common';
import { QuestionnaireService } from './services/questionnaire.service';
import { QuestionnaireController } from './controllers/questionnaire.controller';
import { QuestionnaireRepository } from './repositories/questionnaire.repository';
import { QuestionnairePGRepository } from './repositories/pg/questionnaire.pg.repository';
import { Questionnaire } from './entities/questionnaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire])],
  providers: [
    {
      provide: QuestionnaireRepository,
      useClass: QuestionnairePGRepository,
    },
    QuestionnaireService,
  ],
  controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
