import { Module } from '@nestjs/common';
import { IaController } from './controllers/ia.controller';
import { IaService } from './services/ia.service';

@Module({
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule {}