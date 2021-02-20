import { Controller, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly appService: UrlService) {}
  @Get(':shortUrl')
  async getByShortUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<any> {
    const url = await this.appService.findByShortUrl(shortUrl);
    res.redirect(url);
  }
} 
