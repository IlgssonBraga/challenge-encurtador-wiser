import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urls } from './database/entities/url.entity';
import { UrlService } from './url/url.service';

@Module({
  imports: [
    UrlModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
