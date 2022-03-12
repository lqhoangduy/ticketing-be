import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { EventEntity } from '../domain/entities/event.entity';
import { EventPayloadDto } from '../dto/event.dto';

@Injectable()
export class EventMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(EventEntity, EventPayloadDto);
    };
  }
}
