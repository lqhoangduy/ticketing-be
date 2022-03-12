import { UploadImgService } from './../upload-img/services/upload-img.services';
import { EventCategoryController } from './controllers/event-category.controller';
import { EventController } from './controllers/event.controller';
import { EventCategoryService } from './services/event-category.service';
import { EventCategoryEntity } from './domain/entities/eventCategory.entity';
import { EventEntity } from './domain/entities/event.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './services/event.service';
import { EventMapper } from './mappers/event.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventCategoryEntity])],
  exports: [EventService, EventCategoryService],
  controllers: [EventController, EventCategoryController],
  providers: [
    EventService,
    EventCategoryService,
    UploadImgService,
    EventMapper,
  ],
})
export class EventModule {}
