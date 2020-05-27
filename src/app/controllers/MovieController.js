require('dotenv').config();
const redis = require('redis');
const { Movie } = require('../models');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = {
  async index(req, res) {
    try {
      return redisClient.get('allmovies', async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result) {
          const resultJSON = JSON.parse(result);

          return res.status(200).json(resultJSON);
        }

        const movies = await Movie.findAll();
        redisClient.setex('allmovies', 10, JSON.stringify(movies));

        return res.status(200).json(movies);
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const movieExists = await Movie.findOne({ where: { title: req.body.title } });

      if (movieExists) {
        return res.status(400).json({ error: 'Movie already exists' });
      }

      const movie = await Movie.create(req.body);

      return res.status(200).json(movie);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
