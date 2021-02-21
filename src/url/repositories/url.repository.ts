import { CreateUrlResponse } from '../../dtos/createUrl.dto';
import { ExpiredUrlResponse } from '../../dtos/expiredUrl.dto';

export interface UrlRepository {
  createShortUrl: (url: string) => Promise<CreateUrlResponse>;
  findByShortUrl: (shortUrl: string) => Promise<string | ExpiredUrlResponse>;
}
