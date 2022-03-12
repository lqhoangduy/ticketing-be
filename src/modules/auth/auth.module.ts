import { PaymentModule } from './../payment/payment.module';
import { FacebookAuthModule } from 'facebook-auth-nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RolePermissionModule } from './../role-permission/role-permission.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from '../user/infrastructure/user.repository';
import { ShareModule } from '../share/share.module';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('accessTokenSecret'),
        signOptions: { expiresIn: configService.get('accessTokenExpiration') },
      }),
    }),
    FacebookAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientId: +configService.get('authFacebook.app_id'),
        clientSecret: configService.get('authFacebook.app_secret'),
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
    UserModule,
    PaymentModule,
    PassportModule,
    RolePermissionModule,
    ShareModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
