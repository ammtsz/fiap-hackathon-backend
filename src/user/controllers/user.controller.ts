import {
  Controller,
  Get,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOne(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Digite un e-mail válido.');
    }
    const user = await this.userService.findOne(email);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('teacher')
  async findTeacher(@Query('id') id: number) {
    if (!id) {
      throw new BadRequestException('Insira um professor válido');
    }
    const user = await this.userService.findTeacher(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('student')
  async findStudent(@Query('id') id: number) {
    if (!id) {
      throw new BadRequestException('Insira um aluno válido');
    }
    const user = await this.userService.findStudent(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
