import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '../repositories/subject.repository';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}
  async findSubject() {
    return this.subjectRepository.findSubject();
  }
}
