import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryPGRepository } from './repositories/pg/category.pg.repository';
import { Class } from './entities/class.entity';
import { Grade } from './entities/grade.entity';
import { Subject } from './entities/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Year } from './entities/year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Year, Class, Grade, Subject])],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryPGRepository,
    },

    CategoryService,
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
