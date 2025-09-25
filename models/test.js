/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      // define association here
    }
  }
  Test.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Test sudah terdaftar!',
        },
      },
      keterangan: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Test',
    }
  );
  return Test;
};
