import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urls } from '../database/entities/url.entity';
import { generateString } from '../utils/generateRandomString';
import { addMinutes, differenceInSeconds } from 'date-fns';
import { CreateUrlResponse } from '../dtos/createUrl.dto';
import { ExpiredUrlResponse } from '../dtos/expiredUrl.dto';
import { UrlRepository } from './repositories/url.repository';


@Injectable()
export class UrlService implements UrlRepository {
  constructor(
    @InjectRepository(Urls)
    private urlRepository: Repository<Urls>,
  ) {}
  

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
      endpoints: [
        {
          redirecionaUrl: `${process.env.URL}/${shortString}`,
          metodo: 'GET',
        },
      ],
    };

    return response;
  }

  async findByShortUrl(shortUrl: string): Promise<string | ExpiredUrlResponse> {
    const newUrl = `${process.env.URL}/${shortUrl}`;
    const shortLinkData = await this.urlRepository.findOneOrFail({
      where: { newUrl },
    });

    const now = new Date();

    const datePlusTenMinutes = addMinutes(shortLinkData.createdAt, 1);

    if (differenceInSeconds(datePlusTenMinutes, now) > 0) {
      return shortLinkData.url;
    }

    shortLinkData.expired = true

    await this.urlRepository.save(shortLinkData)

    return {
      message:
        'A url expirou, crie um novo link encurtado para poder continuar',
        expired: shortLinkData.expired,
      endpoints: [
        {
          encurtaUrl: `${process.env.URL}/encurtador`,
          body: 'O body dessa requisição aceita um campo url',
        },
      ],
    };
  }
}
