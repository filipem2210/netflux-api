module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 10],
      },
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
  });

  return User;
};
