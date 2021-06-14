const { Model, DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/connection');

class Services extends Model {}

Services.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true,
      }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notNull: true,
        }
      },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descounted_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          notNull: true,
        }
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'services',
  }
);

module.exports = Services;