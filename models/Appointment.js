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
        references: {
            model: 'service',
            key: 'id',
        },
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    calender_id: {
      type: DataTypes.INTEGER,
      references: {
      model: 'calender',
      key: 'id',
    },
  },
    user_id: {
        type: DataTypes.INTEGER,
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
    modelName: 'appoitnment',
  }
);

module.exports = Appointment;
