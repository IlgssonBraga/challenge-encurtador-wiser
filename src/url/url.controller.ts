import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUrlResponse, UrlService } from './url.service';
import { Response } from 'express';
import { Urls } from '../database/entities/url.entity';

@Controller('')
export class UrlController {
  constructor(private readonly appService: UrlService) {}

  @Get(':shortUrl')
  async getByShortUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<any> {
    const url = await this.appService.findByShortUrl(shortUrl);

    if (typeof url === 'string') {
      res.redirect(url);
      return;
    }

    res.status(401).json(url);
  }

  @Post('/encurtador')
  async addUrl(@Body() body: { url: string }): Promise<CreateUrlResponse> {
    const newUrl = await this.appService.createShortUrl(body.url);

    return newUrl;
  }
} 
