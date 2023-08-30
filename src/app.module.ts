import { Router } from './routes/router';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDatabase } from './config/typeorm.config';
import { RepositoryModule } from './database/repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.${process.env.NODE_ENV}.env`,
    }),

    AppDatabase.toderDatabase(),

    RepositoryModule,

    Router,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
