import { Injectable, Redirect } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urls } from '../database/entities/url.entity';
import { generateString } from '../utils/generateRandomString';
import { addMinutes, differenceInSeconds } from 'date-fns';

export interface CreateUrlResponse {
  newUrl: string;
  endpoints: {
    redirecionaUrl: string;
    metodo: string;
  }[];
}

export interface ExpiredUrlResponse {
  message: string;
  endpoints: {
    encurtaUrl: string;
    body: string;
  }[];
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

    const datePlusTenMinutes = addMinutes(shortLinkData.createdAt, 10);

    if (differenceInSeconds(datePlusTenMinutes, now) > 0) {
      return shortLinkData.url;
    }

    return {
      message:
        'A url expirou, crie um novo link encurtado para poder continuar',
      endpoints: [
        {
          encurtaUrl: `${process.env.URL}/encurtador`,
          body: 'O body dessa requisição aceita um campo url',
        },
      ],
    };
  }
}
