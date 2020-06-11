const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = require('../../utils/redisClient');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiterMiddleware',
  points: 5,
  duration: 60 * 15,
  blockDuration: 60 * 15,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ error: 'Too many accounts created or login attempts from this IP, please try again after 15 minutes' });
    });
};

module.exports = rateLimiterMiddleware;
