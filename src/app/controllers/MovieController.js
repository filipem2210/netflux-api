const { Movie } = require('../models');

const redisClient = require('../../utils/redisClient');

module.exports = {
  async index(req, res) {
    const { genres } = req.query;
    try {
      if (redisClient.connected) {
        return redisClient.get('all_movies', async (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (result) {
            const resultJSON = JSON.parse(result);

            if (genres) {
              const filteredMovies = resultJSON.filter((movie) => movie.genres === genres);
              return res.status(200).json(filteredMovies);
            }

            return res.status(200).json(resultJSON);
          }
          if (genres) {
            const moviesGenre = await Movie.findAll({ where: { genres } });
            return res.status(200).json(moviesGenre);
          }
          const movies = await Movie.findAll();
          redisClient.setex('all_movies', 3600, JSON.stringify(movies));

          return res.status(200).json(movies);
        });
      }
      const movies = await Movie.findAll();

      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async netflix(req, res) {
    try {
      if (redisClient.connected) {
        return redisClient.get('netflix_movies', async (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (result) {
            const resultJSON = JSON.parse(result);

            return res.status(200).json(resultJSON);
          }
          const netflixMovies = await Movie.findAll({ where: { netflix: 1 } });
          redisClient.setex('netflix_movies', 3600, JSON.stringify(netflixMovies));

          return res.status(200).json(netflixMovies);
        });
      }
      const movies = await Movie.findAll({ where: { netflix: 1 } });

      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async top_rated(req, res) {
    try {
      if (redisClient.connected) {
        return redisClient.get('top_rated_movies', async (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (result) {
            const resultJSON = JSON.parse(result);

            return res.status(200).json(resultJSON);
          }
          const topRatedMovies = await Movie.findAll({ where: { top_rated: 1 } });
          redisClient.setex('top_rated_movies', 3600, JSON.stringify(topRatedMovies));

          return res.status(200).json(topRatedMovies);
        });
      }
      const movies = await Movie.findAll({ where: { top_rated: 1 } });

      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async trending(req, res) {
    try {
      if (redisClient.connected) {
        return redisClient.get('trending_movies', async (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (result) {
            const resultJSON = JSON.parse(result);

            return res.status(200).json(resultJSON);
          }
          const trendingMovies = await Movie.findAll({ where: { trending: 1 } });
          redisClient.setex('trending_movies', 3600, JSON.stringify(trendingMovies));

          return res.status(200).json(trendingMovies);
        });
      }
      const movies = await Movie.findAll({ where: { trending: 1 } });

      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
