import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { BankRepository } from '../payment/infrastructure/bank.repository';
import { BankService } from './services/bank.service';
import { PaymentController } from './controllers/payment.controller';
import { UserModule } from '../user/user.module';
import { WalletService } from './services/wallet.service';
import { WalletRepository } from './infrastructure/wallet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankRepository, WalletRepository]),
    forwardRef(() => UserModule),
  ],
  exports: [BankService, WalletService],
  controllers: [PaymentController],
  providers: [BankService, WalletService],
})
export class PaymentModule {}
