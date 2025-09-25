'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Palms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sn: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      studentId: {
        type: Sequelize.STRING,
        unique: true
      },
      image_left: {
        type: Sequelize.TEXT
      },
      image_right: {
        type: Sequelize.TEXT
      },
      wiegand_flag: {
        type: Sequelize.INTEGER
      },
      admin_auth: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Palms');
  }
};