import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { RepositoryModule } from 'src/database/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
