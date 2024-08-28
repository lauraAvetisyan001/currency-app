import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../entities/Currency.entity';
import { PaginationRes } from './pagination';

export class CurrencyPaginationRes extends PaginationRes {
  @ApiProperty({ type: Number })
  numberOfCurrencies: number;

  @ApiProperty({ type: Currency, isArray: true })
  currencies: Currency[];
}
