import { Controller, Get } from '@nestjs/common';
import { Urls } from '../database/entities/url.entity';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly appService: UrlService) {}
  @Get()
  getHello(): Promise<Urls[]> {
    return this.appService.findAll();
  }
}
 