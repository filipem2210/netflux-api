const { User } = require('../models');
const Queue = require('../lib/Queue');

const generateToken = require('../../utils/generateToken');

module.exports = {
  async store(req, res) {
    try {
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, email } = await User.create(req.body);

      const token = await generateToken(id);

      await Queue.add({ email: req.body.email });

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
