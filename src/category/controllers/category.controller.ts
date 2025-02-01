import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { YearService } from '../services/year.service';
import { GradeService } from '../services/grade.service';
import { ClassService } from '../services/class.service';
import { SubjectService } from '../services/subject.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly yearService: YearService,
    private readonly classService: ClassService,
    private readonly subjectService: SubjectService,
    private readonly gradeService: GradeService,
  ) {}

  @Get(':category')
  async getCategory(@Param('category') category: string) {
    if (!category) {
      return null;
    }

    switch (category) {
      case 'years':
        return this.yearService.findYear();
      case 'classes':
        return this.classService.findClass();
      case 'subjects':
        return this.subjectService.findSubject();
      case 'grades':
        return this.gradeService.findGrade();
      default:
        throw new NotFoundException();
    }
  }
}
