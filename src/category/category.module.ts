import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { YearService } from './services/year.service';
import { YearRepository } from './repositories/year.repository';
import { YearPGRepository } from './repositories/pg/year.pg.repository';
import { Year } from './entities/year.entity';
import { ClassService } from './services/class.service';
import { ClassRepository } from './repositories/class.repository';
import { ClassPGRepository } from './repositories/pg/class.pg.repository';
import { Class } from './entities/class.entity';
import { GradeService } from './services/grade.service';
import { GradeRepository } from './repositories/grade.repository';
import { GradePGRepository } from './repositories/pg/grade.pg.repository';
import { Grade } from './entities/grade.entity';
import { SubjectService } from './services/subject.service';
import { SubjectRepository } from './repositories/subject.repository';
import { SubjectPGRepository } from './repositories/pg/subject.pg.repository';
import { Subject } from './entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Year, Class, Grade, Subject])],
  providers: [
    {
      provide: YearRepository,
      useClass: YearPGRepository,
    },
    {
      provide: ClassRepository,
      useClass: ClassPGRepository,
    },
    {
      provide: GradeRepository,
      useClass: GradePGRepository,
    },
    {
      provide: SubjectRepository,
      useClass: SubjectPGRepository,
    },
    YearService,
    ClassService,
    GradeService,
    SubjectService,
  ],
  controllers: [CategoryController],
  exports: [YearService, ClassService, GradeService, SubjectService],
})
export class CategoryModule {}
