import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as Path from 'path';

dotenv.config({
  path: Path.join(process.cwd(), 'env', `${process.env.NODE_ENV}.env`),
});

const defaultOptions: any = (configService: ConfigService) => ({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER_NAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: false,
});

export class AppDatabase {
  static toderDatabase() {
    return TypeOrmModule.forRootAsync({
      name: process.env.DATABASE_NAME,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: process.env.FMSI,
        ...defaultOptions(configService),
        database: configService.get('DATABASE_NAME'),
        entities: [`${__dirname}/../database/entities/*.{js,ts}`],
      }),

      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    });
  }
}
