require('dotenv').config();
const redis = require('redis');
const RedisStore = require('rate-limit-redis');

module.exports = {
  store: new RedisStore({
    client: redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  }),
  windowMs: 1000 * 60 * 15,
  max: 10,
  message: 'Too many accounts created or login attempts from this IP, please try again after 15 minutes',
};
