import { randomBytes } from 'crypto';

function generateApiKey(length: number = 32): string {
  const charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let apiKey: string = "";

  const randomBytesArray: Uint8Array = randomBytes(length);
  randomBytesArray.forEach(byte => {
    const randomIndex: number = byte % charset.length;
    apiKey += charset.charAt(randomIndex);
  });

  return apiKey;
}

export default generateApiKey;