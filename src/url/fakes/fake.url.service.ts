import { Injectable } from '@nestjs/common';
import { Urls } from '../../database/entities/url.entity';
import { generateString } from '../../utils/generateRandomString';
import { addMinutes, differenceInSeconds } from 'date-fns';
import { ModelNotFoundExceptionFilter } from '../../exeption-filters/model-not-found.exception-filter';
import { CreateUrlResponse } from '../../dtos/createUrl.dto';
import { ExpiredUrlResponse } from '../../dtos/expiredUrl.dto';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class FakeUrlService implements UrlRepository {
  private urls: Urls[] = [];

  async createShortUrl(url: string): Promise<CreateUrlResponse> {
    const shortString = generateString();

    const newUrl = `http://192.168.0.1:3000/${shortString}`;
    const urlData = new Urls();

    urlData.url = url;
    urlData.newUrl = newUrl;
    urlData.id = this.urls.length + 1;
    urlData.createdAt = new Date();
    urlData.updatedAt = new Date();

    this.urls.push(urlData);

    const response = {
      newUrl,
      endpoints: [
        {
          redirecionaUrl: `http://192.168.0.1:3000/${shortString}`,
          metodo: 'GET',
        },
      ],
    };

    return response;
  }

  async findByShortUrl(shortUrl: string): Promise<string | ExpiredUrlResponse> {
    const newUrl = `http://192.168.0.1:3000/${shortUrl}`;

    const shortLinkData = this.urls.find((url) => url.newUrl === newUrl);

    if (!shortLinkData) {
      throw new Error();
    }

    const now = new Date();

    const datePlusTenMinutes = addMinutes(shortLinkData.createdAt, 1);

    if (differenceInSeconds(datePlusTenMinutes, now) > 0) {
      return shortLinkData.url;
    }

    return {
      message:
        'A url expirou, crie um novo link encurtado para poder continuar',
      expired: true,
      endpoints: [
        {
          encurtaUrl: 'http://192.168.0.1:3000/encurtador',
          body: 'O body dessa requisição aceita um campo url',
        },
      ],
    };
  }
}
