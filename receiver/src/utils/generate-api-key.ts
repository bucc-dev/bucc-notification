import {randomBytes} from 'crypto';

function generateApiKey(length = 32): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';

  const randomBytesArray = randomBytes(length);
  randomBytesArray.forEach(byte => {
    const randomIndex = byte % charset.length;
    apiKey += charset.charAt(randomIndex);
  });

  return apiKey;
}

export default generateApiKey;
