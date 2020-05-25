require('dotenv').config();
const redis = require('redis');
const { User } = require('../models');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  host: 'redis',
  port: REDIS_PORT,
});

const generateToken = require('../../utils/generateToken');

module.exports = {
  async index(req, res) {
    try {
      return redisClient.get('allusers', async (err, result) => {
        if (result) {
          const resultJSON = JSON.parse(result);

          return res.status(200).json(resultJSON);
        }

        const users = await User.findAll();
        redisClient.setex('allusers', 10, JSON.stringify(users));

        return res.status(200).json(users);
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, email } = await User.create(req.body);

      const token = await generateToken(id);

      return res.status(201).json({
        user: {
          email,
        },
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      if (!req.authorized_user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id } = req.authorized_user;

      const {
        email,
        name,
        avatar,
      } = await User.findByPk(id);

      return res.status(200).json({
        email,
        name,
        avatar,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
