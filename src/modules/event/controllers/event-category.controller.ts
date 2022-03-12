import { EventCategoryEntity } from './../domain/entities/eventCategory.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventCategoryService } from '../services/event-category.service';

@Controller('categories')
@ApiTags('categories')
export class EventCategoryController {
  constructor(private readonly categoryService: EventCategoryService) {}

  @Get('')
  getAllCategories(): Promise<EventCategoryEntity[]> {
    return this.categoryService.getAll();
  }
}
