import { UserRepository } from './infrastructure/user.repository';
import { RolePermissionModule } from './../role-permission/role-permission.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { BankRepository } from '../payment/infrastructure/bank.repository';
import { UserMapper } from './mappers/user.mapper';
import { ShareModule } from './../share/share.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, BankRepository]),
    RolePermissionModule,
    ShareModule,
    forwardRef(() => PaymentModule),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserMapper],
})
export class UserModule {}
