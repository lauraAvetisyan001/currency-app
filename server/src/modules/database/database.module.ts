import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Currency } from 'src/shared/entities/Currency.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: config.get<number>('POSTGRES_PORT'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],

          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Currency]),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
