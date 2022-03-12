import { UploadImgModule } from './modules/upload-img/upload-img.module';
import { EventModule } from './modules/event/event.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { join } from 'path';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions/exception-filter';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ShareModule } from './modules/share/share.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environments/.env.${process.env.NODE_ENV}`],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get('database.sync'),
        ssl: configService.get('database.ssl'),
      }),
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      singular: true,
    }),
    AuthModule,
    UserModule,
    RolePermissionModule,
    OrderModule,
    EventModule,
    UploadImgModule,
    PaymentModule,
    ShareModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
