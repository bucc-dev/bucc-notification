import {createHash} from 'crypto';

const hashApiKey = (key: string): string => {
  const hash = createHash('sha256');
  hash.update(key + process.env.REGISTER_HASH_SALT);
  return hash.digest('hex');
};

export default hashApiKey;
