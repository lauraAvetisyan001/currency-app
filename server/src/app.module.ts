import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './modules/currency/currency.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './modules/cron/cron.module';
import { CoinmarketCapModule } from './modules/coinmarketcap/coinmarketcap.module';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    CurrencyModule,
    CronModule,
    CoinmarketCapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
