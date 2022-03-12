import { EventCategoryEntity } from './../domain/entities/eventCategory.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategoryEntity)
    private eventCategoryRepository: Repository<EventCategoryEntity>,
  ) {}

  async getAll(): Promise<EventCategoryEntity[]> {
    try {
      return await this.eventCategoryRepository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
