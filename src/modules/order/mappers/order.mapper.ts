import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { EventEntity } from './../../event/domain/entities/event.entity';
import { OrderEntity } from './../domain/entities/order.entity';
import { EventDto, OrderPayloadDto } from './../dto/order-payload.dto';

@Injectable()
export class OrderMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(OrderEntity, OrderPayloadDto);
      mapper.createMap(EventEntity, EventDto);
    };
  }
}
