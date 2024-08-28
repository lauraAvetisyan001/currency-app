import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Currency } from 'src/shared/entities/Currency.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CurrencyService {
  public constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  public async getCurrencies(
    pagination: PaginationDto,
    search_text: string | null,
  ): Promise<[Currency[], number]> {
    const query: SelectQueryBuilder<Currency> =
      this.currencyRepository.createQueryBuilder('currency');
    if (search_text) {
      query.where('LOWER(currency.name) ILIKE :search_text', {
        search_text: `%${search_text.toLowerCase()}%`,
      });
    }
    query.take(pagination.limit).skip((pagination.page - 1) * pagination.limit);

    return await query.getManyAndCount();
  }
}
