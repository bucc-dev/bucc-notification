import {rateLimit, RateLimitRequestHandler} from 'express-rate-limit';

/**
 * Rate limiter middleware
 * @returns RateLimitRequestHandler
 */
const rateLimiter = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 60 * 1000 * 2,
    max: 15,
    message: 'Too many requests from this IP, please try again after a minute',
  });
};

export default rateLimiter;
