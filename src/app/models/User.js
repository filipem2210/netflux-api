module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field is required',
        },
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field is required',
        },
        len: {
          args: [6, 10],
          msg: 'This field must be between 6 and 10 characters',
        },
      },
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
  });

  return User;
};
