export const generateString = () => {
  const defaultString =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const min = 5;
  const max = 10;
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += defaultString.charAt(
      Math.floor(Math.random() * defaultString.length),
    );
  }

  return result;
};
