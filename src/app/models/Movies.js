module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter movie title',
        },
        notEmpty: {
          msg: 'Please enter movie title',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter movie description',
        },
        notEmpty: {
          msg: 'Please enter movie description',
        },
      },
    },
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    genres: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    netflix: DataTypes.BOOLEAN,
    trending: DataTypes.BOOLEAN,
    top_rated: DataTypes.BOOLEAN,
    creators: DataTypes.STRING,
    cast: DataTypes.STRING,
  });

  return Movie;
};
