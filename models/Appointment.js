const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model {}

Appointment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'service',
            key: 'id',
        },
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
        },
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'calender',
        key: 'day',
      },
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'calender',
        key: 'hour',
      },
  },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'appointment',
  }
);

module.exports = Appointment;