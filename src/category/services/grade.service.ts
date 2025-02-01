import { Injectable } from '@nestjs/common';
import { GradeRepository } from '../repositories/grade.repository';

@Injectable()
export class GradeService {
  constructor(private readonly gradeRepository: GradeRepository) {}
  async findGrade() {
    return this.gradeRepository.findGrade();
  }
}
