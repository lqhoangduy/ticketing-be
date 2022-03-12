import { ApiProperty } from '@nestjs/swagger';
export class PagingOptionDto {
  @ApiProperty()
  page?: number;

  @ApiProperty()
  limit?: number;
}
