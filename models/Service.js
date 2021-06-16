const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Service extends Model {}

Service.init({
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
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  descounted_price: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      notNull: true,
    }
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'service',
});

module.exports = Service;
