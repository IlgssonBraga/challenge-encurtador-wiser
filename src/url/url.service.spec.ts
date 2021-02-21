import { differenceInMinutes } from 'date-fns';
import { FakeUrlService } from './fakes/fake.url.service';

describe('UrlService', () => {
  let service = new FakeUrlService();

  it('should be passing a url we get a newUrl in the response.', async () => {
    const newUrlResponse = await service.createShortUrl(
      'https://github.com/IlgssonBraga',
    );

    expect(newUrlResponse).toHaveProperty('newUrl');
  });

  it('should be passing a url we get a endpoints in the response.', async () => {
    const newUrlResponse = await service.createShortUrl(
      'https://github.com/IlgssonBraga',
    );

    expect(newUrlResponse.endpoints).toEqual([
      {
        redirecionaUrl: `${newUrlResponse.newUrl}`,
        metodo: 'GET',
      },
    ]);
  });

  it('should be return a string with url passing the shortener url', async () => {
    const newUrlCreate = await service.createShortUrl(
      'https://github.com/IlgssonBraga',
    );

    const shortenerUrl = newUrlCreate.newUrl.split('/')[3];

    const newUrlResponse = await service.findByShortUrl(shortenerUrl);;

    expect(newUrlResponse).toEqual('https://github.com/IlgssonBraga');
  });

  it('should be newUrl expires in 10 minutes', async () => {
    const newUrlCreate = await service.createShortUrl(
      'https://github.com/IlgssonBraga',
    );

    const shortenerUrl = newUrlCreate.newUrl.split('/')[3];

    await service.removeTenMinutesToCreatedAt(newUrlCreate.newUrl);

    const response = await service.findByShortUrl(shortenerUrl);

    expect(response).toEqual({
      message:
        'A url expirou, crie um novo link encurtado para poder continuar',
      expired: true,
      endpoints: [
        {
          encurtaUrl: 'http://192.168.0.1:3000/encurtador',
          body: 'O body dessa requisição aceita um campo url',
        },
      ],
    });
  });

  it('should be possible remove 10 minutes from date (created only for tests)', async () => {
    const newUrlCreate = await service.createShortUrl(
      'https://github.com/IlgssonBraga',
    );

    const response = await service.removeTenMinutesToCreatedAt(newUrlCreate.newUrl)

    expect(differenceInMinutes(new Date(), response.createdAt)).toEqual(10)
    });

    it('should be possible remove 10 minutes from date (created only for tests)', async () => {

      // expect().toBeInstanceOf(Error)

      await expect(
        service.findByShortUrl('123')
    ).rejects.toBeInstanceOf(Error);
      });
});

