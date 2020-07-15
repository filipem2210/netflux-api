module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    file: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    creators: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    cast: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    genres: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('movies'),
};
