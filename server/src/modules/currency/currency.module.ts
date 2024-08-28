import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
