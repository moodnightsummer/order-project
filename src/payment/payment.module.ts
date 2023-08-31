import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { RepositoryModule } from 'src/database/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
