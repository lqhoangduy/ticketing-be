import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { User } from './../../../decorator/user.decorator';
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../dto/order.dto';
import { PagingOptionDto } from '../dto/paging-option.dto';
import { OrderService } from '../services/order.service';
import { OrderPayloadDto } from '../dto/order-payload.dto';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() orderDto: OrderDto) {
    return this.orderService.create(orderDto);
  }

  @Get('/paging')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllEvent(
    @Query() pagingOption: PagingOptionDto,
    @User('id') userId: string,
  ): Promise<{ orders: OrderPayloadDto[]; total: number }> {
    return await this.orderService.getPaging(pagingOption, userId);
  }
}
