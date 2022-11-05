/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      start_x: {
        type: Sequelize.TEXT,
      },
      start_y: {
        type: Sequelize.TEXT,
      },
      finish_x: {
        type: Sequelize.TEXT,
      },
      finish_y: {
        type: Sequelize.TEXT,
      },
      done: {
        type: Sequelize.BOOLEAN,
      },
      foto: {
        type: Sequelize.BLOB,
      },
      date_start: {
        type: Sequelize.TEXT,
      },
      date_finish: {
        type: Sequelize.TEXT,
      },
      private: {
        type: Sequelize.BOOLEAN,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  },
};
