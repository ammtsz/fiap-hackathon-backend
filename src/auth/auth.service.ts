import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  private users = [
    { email: 'test@example.com', password: '12345' }, // Usuário fake
  ];

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password)
    const user = await this.userService.findOne(email);
    console.log(user)
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email }; 
    return {
      access_token: this.jwtService.sign(payload), // Gera o token JWT
    };
  }
}
