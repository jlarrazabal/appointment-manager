const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlockDay extends Model {}

BlockDay.init(
  {
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
      isDate: true,
      },
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
      isDate: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blockday',
  }
);

module.exports = BlockDay;
