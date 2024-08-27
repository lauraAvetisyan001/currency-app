import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  @ApiProperty({ type: Number })
  id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: String })
  name: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: String })
  currency: string;

  @Column({ type: 'numeric' })
  @ApiProperty({ type: Number })
  price: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ type: Date })
  lastUpdated: Date;
}
