require('dotenv').config();
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET_KEY,
  name: 'netfluxCookieSession',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // path: '/',
    httpOnly: true,
    secure: true,
    // domain: process.env.CORS_ORIGIN,
    maxAge: 60000 * 60 * 24,
  },
};
