import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HttpModule } from '@nestjs/axios';
import { CoinMarketCapService } from './coinmarketcap.service';
@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [CoinMarketCapService],
  exports: [CoinMarketCapService],
})
export class CoinmarketCapModule {}
