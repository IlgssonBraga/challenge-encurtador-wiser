import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class UrlService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}

  async findAll(): Promise<Url[]> {
    const urls = await this.urlRepository.find();

    return urls;
  }
}
