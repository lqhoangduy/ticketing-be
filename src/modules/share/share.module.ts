import { Module } from '@nestjs/common';
import { AxiosService } from './services/axios.service';
import { TatumService } from './services/tatum.service';

@Module({
  exports: [TatumService],
  providers: [TatumService, AxiosService],
})
export class ShareModule {}
