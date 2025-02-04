import { Module } from '@nestjs/common';
import { QuestionnaireService } from './services/questionnaire.service';
import { QuestionnaireController } from './controllers/questionnaire.controller';
import { QuestionnaireRepository } from './repositories/questionnaire.repository';
import { QuestionnairePGRepository } from './repositories/pg/questionnaire.pg.repository';
import { Questionnaire } from './entities/questionnaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentQuestionnaire } from 'src/questionnaire/entities/student-questionnaire.entity';
import { QuestionnaireClass } from './entities/questionnaire-class.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire,
      StudentQuestionnaire,
      QuestionnaireClass,
      Question,
    ]),
  ],
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
