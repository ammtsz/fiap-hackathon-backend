import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUser(email: string) {
    return this.userRepository.getUser(email);
  }

  async getTeacher(id: number) {
    return this.userRepository.getTeacher(id);
  }

  async getStudent(id: number) {
    return this.userRepository.getStudent(id);
  }
}
