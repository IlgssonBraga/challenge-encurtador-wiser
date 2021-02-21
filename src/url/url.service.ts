import { Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urls } from '../database/entities/url.entity';
import { generateString } from '../utils/generateRandomString';

export interface CreateUrlResponse {
  newUrl: string;
}
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

  async createShortUrl(url: string): Promise<CreateUrlResponse> {
    const shortString = generateString();

    const newUrl = `${process.env.URL}/${shortString}`;

    const urlData = {
      url,
      newUrl,
    };

    const shortUrl = this.urlRepository.create(urlData);

    await this.urlRepository.save(shortUrl);

    const response = {
      newUrl,
    };

    return response;
  }

  async findByShortUrl(shortUrl: string): Promise<string> {
    const newUrl = `${process.env.URL}/${shortUrl}`;
    const url = await this.urlRepository.findOneOrFail({ where: { newUrl } });
    return url.url;
  }
}
