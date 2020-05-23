const { User } = require('../models');

const generateToken = require('../../utils/generateToken');

module.exports = {
  async store(req, res) {
    try {
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) { return res.status(400).json({ error: 'User already exists' }); }

      const { id, email } = await User.create(req.body);

      const token = await generateToken(id);

      return res.status(201).json({ user: { email, token } });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
