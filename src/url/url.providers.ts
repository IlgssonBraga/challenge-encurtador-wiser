import { Connection } from 'typeorm';
import { Url } from './url.entity';

export const urlProviders = [
  {
    provide: 'URL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Url),
    inject: ['DATABASE_CONNECTION'],
  },
];
