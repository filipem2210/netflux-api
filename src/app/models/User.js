const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email',
        },
        notEmpty: {
          msg: 'Please enter your email',
        },
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password',
        },
        notEmpty: {
          msg: 'Please enter your password',
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

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(user.password, salt);

    user.set('password', hashPwd);
  });

  return User;
};
