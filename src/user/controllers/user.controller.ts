import {
  Controller,
  Get,
  Query,
  BadRequestException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Digite un e-mail válido.');
    }
    const user = await this.userService.getUser(email);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('teacher/:id')
  async getTeacher(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Insira um professor válido');
    }
    const user = await this.userService.getTeacher(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('student/:id')
  async getStudent(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Insira um aluno válido');
    }
    const user = await this.userService.getStudent(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
