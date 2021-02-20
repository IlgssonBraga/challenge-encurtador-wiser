import { Controller, Get } from '@nestjs/common';
import { Url } from './url.entity';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly appService: UrlService) {}
  @Get()
  getHello(): Promise<Url[]> {
    return this.appService.findAll();
  }
}
