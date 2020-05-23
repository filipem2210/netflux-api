module.exports = {
  async show(req, res) {
    try {
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },
};
