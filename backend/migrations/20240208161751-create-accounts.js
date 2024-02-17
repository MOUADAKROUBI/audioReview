'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      lf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      audios: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      lf_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('INSTALLED', 'UNINSTALLED'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
