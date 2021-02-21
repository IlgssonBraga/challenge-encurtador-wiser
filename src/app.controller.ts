import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService, EmptyCallResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(400)
  getHello(): EmptyCallResponse {
    return this.appService.emptyCall();
  }
}
