import { ApiProperty } from '@nestjs/swagger';

export class PaginationRes {
  @ApiProperty({ type: Number, example: 10 })
  limit: number;

  @ApiProperty({ type: Number, example: 1 })
  currentPage: number;

  @ApiProperty({ type: Number, example: 15 })
  maxPage: number;
}
