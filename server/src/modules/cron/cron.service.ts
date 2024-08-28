import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinMarketCapService } from '../coinmarketcap/coinmarketcap.service';

@Injectable()
export class CronService {
  public constructor(
    private readonly coinMarketCapService: CoinMarketCapService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async handleCron(): Promise<void> {
    await this.coinMarketCapService.updateCurrencies();
  }
}
