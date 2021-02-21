import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  CreateUrlResponse,
  ExpiredUrlResponse,
  UrlService,
} from './url.service';
import { Response } from 'express';

@Controller('')
export class UrlController {
  constructor(private readonly appService: UrlService) {}

  @Get(':newUrl')
  async getByShortUrl(
    @Param('newUrl') newUrl: string,
    @Res() res: Response,
  ): Promise<string | ExpiredUrlResponse> {
    const url = await this.appService.findByShortUrl(newUrl);

    if (typeof url === 'string') {
      res.redirect(url);
      return;
    }

    res.status(401).json(url);
    return;
  }

  @Post('/encurtador')
  async generateNewUrl(
       @Body() body: { url: string }
  ): Promise<CreateUrlResponse> {
    const newUrl = await this.appService.createShortUrl(body.url);

    return newUrl;
  }
} 
