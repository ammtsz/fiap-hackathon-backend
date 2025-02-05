import { Controller, Post, Body } from '@nestjs/common';
import { IaService } from '../services/ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post()
  async generate(@Body('text') text: string): Promise<string> {
    return this.iaService.generate(text);
  }
}