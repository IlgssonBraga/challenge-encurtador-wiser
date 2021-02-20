import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { urlProviders } from './url.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [...urlProviders, UrlService],
  exports: [UrlService],
})
export class UrlModule {}
