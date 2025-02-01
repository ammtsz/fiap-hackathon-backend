import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOne(email: string) {
    return this.userRepository.getUser(email);
  }

  async findTeacher(id: number) {
    return this.userRepository.getTeacher(id);
  }

  async findStudent(id: number) {
    return this.userRepository.getStudent(id);
  }
}
