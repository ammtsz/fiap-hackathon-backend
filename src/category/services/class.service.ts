import { Injectable } from '@nestjs/common';
import { ClassRepository } from '../repositories/class.repository';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}
  async findClass() {
    return this.classRepository.findClass();
  }
}
