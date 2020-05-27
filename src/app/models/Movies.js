module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    file: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter movie file',
        },
        notEmpty: {
          msg: 'Please enter movie file',
        },
      },
    },
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter movie image',
        },
        notEmpty: {
          msg: 'Please enter movie image',
        },
      },
    },
    creators: DataTypes.STRING,
    cast: DataTypes.STRING,
    genres: DataTypes.STRING,
  });

  return Movie;
};
