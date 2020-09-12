'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      total_response: {
        type: Sequelize.INTEGER
      },
      id_client: {
        type: Sequelize.INTEGER
      },
      id_seller: {
        type: Sequelize.INTEGER
      },
      items: {
        type: Sequelize.TEXT
      },
      cash: {
        type: Sequelize.INTEGER
      },
      total_pay: {
        type: Sequelize.INTEGER
      },
      total_back: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};