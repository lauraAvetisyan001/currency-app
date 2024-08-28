import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CronService } from './cron.service';
import { CoinmarketCapModule } from '../coinmarketcap/coinmarketcap.module';

@Module({
  imports: [DatabaseModule, CoinmarketCapModule],
  controllers: [],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
