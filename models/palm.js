'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Palm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Palm.init({
    sn: DataTypes.STRING,
    name: DataTypes.STRING,
    studentId: {
      type: DataTypes.STRING,
      unique: true
    },
    image_left: DataTypes.TEXT,
    image_right: DataTypes.TEXT,
    wiegand_flag: DataTypes.INTEGER,
    admin_auth: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Palm',
  });
  return Palm;
};