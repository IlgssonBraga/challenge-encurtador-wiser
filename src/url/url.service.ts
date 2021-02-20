import { Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urls } from '../database/entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Urls)
    private urlRepository: Repository<Urls>,
  ) {}
  async findAll(): Promise<Urls[]> {
    const urls = await this.urlRepository.find();

    return urls;
  }

  async findByShortUrl(shortUrl: string): Promise<string> {
    const url = await this.urlRepository.findOneOrFail({ where: { shortUrl } });
    return url.url;
  }
}
