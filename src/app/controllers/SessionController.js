const { User } = require('../models');
const checkPassword = require('../../utils/checkPassword');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) return res.status(401).json({ error: 'User not found' });

      const passwordMatch = await checkPassword.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const {
        id,
        name,
        avatar,
      } = user;

      const token = await generateToken(id);

      return res.json({
        user: {
          id,
          email,
          name,
          avatar,
        },
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
