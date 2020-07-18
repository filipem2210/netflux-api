module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    backdrop_path: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    poster_path: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    genres: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    year: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    netflix: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    trending: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    top_rated: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    creators: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    cast: {
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
