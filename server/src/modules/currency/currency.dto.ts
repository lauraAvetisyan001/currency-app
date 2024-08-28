import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetCurrenciesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, required: false })
  search_text?: string | undefined;
}
