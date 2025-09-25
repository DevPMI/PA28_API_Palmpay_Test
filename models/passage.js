'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Passage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Passage.init({
    sn: DataTypes.STRING,
    name: DataTypes.STRING,
    studentId: DataTypes.STRING,
    type: DataTypes.STRING,
    device_date_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Passage',
  });
  return Passage;
};