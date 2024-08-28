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
  symbol: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: String })
  name: string;

  @Column('decimal', { precision: 30, scale: 8 })
  @ApiProperty({ type: Number })
  price: number;

  @Column('decimal', { precision: 39, scale: 8 })
  @ApiProperty({ type: Number })
  marketCap: number;

  @Column('decimal', { precision: 30, scale: 8 })
  @ApiProperty({ type: Number })
  volume24h: number;

  @Column('decimal', { precision: 30, scale: 8 })
  @ApiProperty({ type: Number })
  percentChange24h: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ type: Date })
  lastUpdated: Date;
}
