import { Injectable } from '@nestjs/common';
import { YearRepository } from '../repositories/year.repository';

@Injectable()
export class YearService {
  constructor(private readonly yearRepository: YearRepository) {}
  async findYear() {
    return this.yearRepository.findYear();
  }
}
