import { generateString } from './generateRandomString';

describe('RandomString', () => {
  it('should be a random string with length between 5 and 10.', async () => {
    const randomString = generateString();

    expect(randomString.length).toBeGreaterThan(4);
    expect(randomString.length).toBeLessThan(11);
  });
});
