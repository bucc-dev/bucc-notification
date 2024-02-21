import {rateLimit, RateLimitRequestHandler} from 'express-rate-limit';

const rateLimiter = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 60 * 1000 * 2,
    max: 15,
    message: 'Too many requests from this IP, please try again after a minute',
  });
};

export default rateLimiter;
