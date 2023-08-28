import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'Ryan',
  entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
  synchronize: true,
};
