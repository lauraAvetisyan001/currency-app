import {
  Controller,
  Get,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Response } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { CurrencyPaginationRes } from 'src/shared/swagger/pagination/currency.pagination';
import { GetCurrenciesDto } from './currency.dto';
import { Currency } from 'src/shared/entities/Currency.entity';

@Controller('currencies')
@UsePipes(new ValidationPipe({ transform: true }))
export class CurrencyController {
  public constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @ApiOkResponse({ type: CurrencyPaginationRes })
  public async getCurrencies(
    @Res() response: Response<CurrencyPaginationRes>,
    @Query() query: GetCurrenciesDto,
  ): Promise<Response> {
    const limit: number = query.limit;
    const page: number = query.page;

    const [currencies, count]: [Currency[], number] =
      await this.currencyService.getCurrencies(
        { limit: limit, page: page },
        query.search_text,
      );

    const maxPage = count > 0 ? Math.ceil(count / limit) : 1;

    return response.status(200).json({
      limit: limit,
      maxPage: maxPage,
      currentPage: page,
      numberOfCurrencies: count,
      currencies: currencies,
    });
  }
}
