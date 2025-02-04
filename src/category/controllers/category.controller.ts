import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':category')
  async getCategory(@Param('category') category: string) {
    if (!category) {
      return null;
    }

    switch (category) {
      case 'years':
        return this.categoryService.findYear();
      case 'classes':
        return this.categoryService.findClass();
      case 'subjects':
        return this.categoryService.findSubject();
      case 'grades':
        return this.categoryService.findGrade();
      default:
        throw new NotFoundException();
    }
  }
}
