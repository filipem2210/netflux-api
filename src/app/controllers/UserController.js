const { User } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) { return res.status(400).json({ error: 'User already exists' }); }

      const { email } = await User.create(req.body);

      return res.status(201).json({ user: { email } });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
