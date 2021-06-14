const User = require('./User');
const BlockDay = require('./BlockDay')

User.hasMany(ModelName, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

ModelName.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, BlockDay};
