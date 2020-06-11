const redis = require('redis');

const redisConfig = require('../config/redis');

const redisClient = redis.createClient(redisConfig);

module.exports = redisClient;
