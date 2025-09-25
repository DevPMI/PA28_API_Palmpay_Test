/** @format */

'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      nama: {
        type: Sequelize.STRING,
        unique: true,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      deletedBy: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Tests');
  },
};
