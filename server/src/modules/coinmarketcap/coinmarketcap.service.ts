import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Currency } from 'src/shared/entities/Currency.entity';
import {
  CurrenciesResponse,
  CurrencyData,
} from 'src/shared/interfaces/coinmarketcap';
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
    await this.loadCurrenciesIntoDB();
  }

  private async loadCurrenciesIntoDB(): Promise<void> {
    const currencies: CurrenciesResponse = await this.getLatestCurrencies();

    if (currencies && currencies.data) {
      for (const currencyData of currencies.data) {
        const currency = new Currency();
        currency.symbol = currencyData.symbol;
        currency.name = currencyData.name;
        currency.price = currencyData.quote.USD.price;
        currency.marketCap = currencyData.quote.USD.market_cap;
        currency.volume24h = currencyData.quote.USD.volume_24h;
        currency.percentChange24h = currencyData.quote.USD.percent_change_24h;

        await this.currencyRepository.save(currency);
      }
    }
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
    const currencies: CurrenciesResponse = await this.getLatestCurrencies();
    console.log('currencies');
    if (currencies && currencies.data) {
      await Promise.all([
        this.insertOrUpdateCurrencies(currencies.data),
        this.deleteStaleCurrencies(currencies.data),
      ]);
    }
  }

  private async insertOrUpdateCurrencies(
    currenciesData: CurrencyData[],
  ): Promise<void> {
    const insertPromises = currenciesData.map(async (currencyData) => {
      const { symbol, name, quote } = currencyData;
      const currency = {
        symbol,
        name,
        price: quote.USD.price,
        marketCap: quote.USD.market_cap,
        volume24h: quote.USD.volume_24h,
        percentChange24h: quote.USD.percent_change_24h,
      };

      await this.currencyRepository
        .createQueryBuilder()
        .insert()
        .into(Currency)
        .values(currency)
        .execute();
    });

    await Promise.all(insertPromises);
  }

  private async deleteStaleCurrencies(
    currenciesData: CurrencyData[],
  ): Promise<void> {
    const validSymbols = currenciesData.map((data) => data.symbol);

    await this.currencyRepository
      .createQueryBuilder()
      .delete()
      .from(Currency)
      .where('"symbol" NOT IN (:...validSymbols)', { validSymbols })
      .execute();
  }
}
