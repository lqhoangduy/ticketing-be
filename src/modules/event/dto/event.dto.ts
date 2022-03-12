import { AutoMap } from '@automapper/classes';
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
export class EventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  totalTickets: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  ticketPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  maxTicketOrder: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  minTicketOrder: number;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  saleStartDate: string;

  @ApiProperty()
  @IsNotEmpty()
  saleEndDate: string;

  @ApiProperty()
  @IsNotEmpty()
  eventStartDate: string;

  @ApiProperty()
  @IsNotEmpty()
  eventEndDate: string;

  //optional
  @ApiProperty()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty()
  @IsOptional()
  bannerUrl?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  eventPlaceName?: string;

  @ApiProperty()
  @IsOptional()
  eventAddress?: string;

  @ApiProperty()
  @IsOptional()
  ticketImageUrl?: string;

  @ApiProperty()
  @IsOptional()
  organizationInfo?: string;

  @ApiProperty()
  @IsOptional()
  organizationEmail?: string;

  @ApiProperty()
  @IsOptional()
  organizationPhone?: string;

  @ApiProperty()
  @IsOptional()
  organizationAddress?: string;

  @ApiProperty()
  @IsOptional()
  availableTickets?: number;
}

export class Pagination {
  @ApiProperty()
  page?: number = 1;

  @ApiProperty()
  pageSize?: number = 0;
}

export class EventFilterDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  categoryId?: string;
}

export class EventPayloadDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  logoUrl: string;

  @AutoMap()
  bannerUrl: string;

  @AutoMap()
  eventStartDate: string;

  @AutoMap()
  eventPlaceName: string;

  @AutoMap()
  eventAddress: string;
}

export class PaginationEvent extends PartialType(
  IntersectionType(EventFilterDto, Pagination),
) {}
