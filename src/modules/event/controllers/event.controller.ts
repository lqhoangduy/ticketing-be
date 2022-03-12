import {
  PaginationEvent,
  Pagination,
  EventPayloadDto,
} from './../dto/event.dto';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { EventDto } from '../dto/event.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';
import { User } from 'src/decorator/user.decorator';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createEvent(@Body() model: EventDto) {
    return this.eventService.create(model);
  }

  @Put('/:eventId')
  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async updateEvent(
    @Param('eventId') eventId: string,
    @Body() eventInfo: EventDto,
    @User('id') userId: string,
  ): Promise<any> {
    return await this.eventService.updateEventDetail(
      eventId,
      eventInfo,
      userId,
    );
  }

  @Get('/paging')
  async getAllEvent(
    @Query() query: PaginationEvent,
  ): Promise<{ events: EventPayloadDto[]; total: number }> {
    const { page, pageSize, ...rest } = query || {};
    return await this.eventService.getEventPaging(rest, {
      page,
      pageSize,
    } as Pagination);
  }

  @Get('/:eventId')
  async getEvent(@Param('eventId') eventId: string): Promise<EventEntity> {
    return await this.eventService.getEventById(eventId);
  }

  @Get('')
  async getEvents(): Promise<EventEntity[]> {
    return await this.eventService.getEvents();
  }
}
