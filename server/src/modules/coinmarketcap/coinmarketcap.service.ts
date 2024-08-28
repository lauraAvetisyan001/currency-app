import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Currency } from 'src/shared/entities/Currency.entity';
import { CurrenciesResponse } from 'src/shared/interfaces/coinmarketcap';
import { Repository } from 'typeorm';

@Injectable()
export class CoinMarketCapService {
  private readonly apiKey: string = process.env.COINMARKETCAP_API_KEY;
  private readonly apiUrl: string =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

  public constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  public async onModuleInit(): Promise<void> {
    await this.updateCurrencies();
  }

  public async getLatestCurrencies(): Promise<CurrenciesResponse | null> {
    const response = await axios.get(this.apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': this.apiKey,
      },
      params: {
        start: '1',
        limit: '100',
        convert: 'USD',
      },
    });

    if (!response) {
      return null;
    }
    return response.data;
  }

  public async updateCurrencies(): Promise<void> {
    const currencies = await this.getLatestCurrencies();
    if (currencies && currencies.data) {
      const currencyEntities = currencies.data.map((currencyData) => {
        const currency = new Currency();
        currency.symbol = currencyData.symbol;
        currency.name = currencyData.name;
        currency.price = currencyData.quote.USD.price;
        currency.marketCap = currencyData.quote.USD.market_cap;
        currency.volume24h = currencyData.quote.USD.volume_24h;
        currency.percentChange24h = currencyData.quote.USD.percent_change_24h;
        currency.lastUpdated = new Date();
        return currency;
      });

      await this.currencyRepository.createQueryBuilder().delete().execute();

      await this.currencyRepository.save(currencyEntities);
    }
  }
}
