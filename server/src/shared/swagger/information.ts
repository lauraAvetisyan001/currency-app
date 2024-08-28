import { ApiProperty } from '@nestjs/swagger';

export class InformationRes {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Boolean })
  success: boolean;
}
