const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Calendar extends Model {};

Calendar.init(
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
    duration: {
    type: DataTypes.INTEGER,
    defaultValue: 120,
    allowNull: false,
    validate: {
        notNull: true,
      },
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
    modelName: 'calendar',
  }
)

module.exports= Calendar;