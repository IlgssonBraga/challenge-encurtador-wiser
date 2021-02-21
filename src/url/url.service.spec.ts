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

  // it('should be newUrl expires in 10 minutes', async () => {
  //   const newUrlCreate = await service.createShortUrl(
  //     'https://github.com/IlgssonBraga',
  //   );

  //   const shortenerUrl = newUrlCreate.newUrl.split('/')[3];

  //   console.log('fora', new Date());
  //   jest.useFakeTimers();
  //   setInterval(() => {
  //     setInterval(() => {
  //       console.log('dentro', new Date());
  //     }, 600000);
  //   }, 600000);

  //   jest.advanceTimersByTime(600000);
  //   const a = await service.findByShortUrl(shortenerUrl);
  //   console.log('a', a);

  //   expect(1).toEqual(1);
  // });
});

