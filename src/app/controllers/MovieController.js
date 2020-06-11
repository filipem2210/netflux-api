const { Movie } = require('../models');
const uploadImg = require('../../utils/uploadImg');

const redisClient = require('../../utils/redisClient');

module.exports = {
  async index(req, res) {
    try {
      if (redisClient.connected) {
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
      }
      const movies = await Movie.findAll();

      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const {
        file,
        title,
        description,
        creators,
        cast,
        genres,
      } = req.body;

      const movieExists = await Movie.findOne({ where: { title } });

      if (movieExists) {
        return res.status(400).json({ error: 'Movie already exists' });
      }

      let fileName;
      if (req.file) {
        fileName = await uploadImg(req.file, 341, 192, 'movies');
      } else {
        return res.status(400).json({ message: 'The movie image is required' });
      }

      const movie = await Movie.create({
        file,
        title,
        description,
        image: fileName,
        creators,
        cast,
        genres,
      });

      return res.status(201).json({
        file: movie.file,
        title: movie.title,
        description: movie.description,
        image: movie.image,
        creators: movie.creators,
        cast: movie.cast,
        genres: movie.genres,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
