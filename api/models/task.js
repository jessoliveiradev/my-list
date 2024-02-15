const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const taskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
};

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(...Object.values(taskStatus)),
    allowNull: false,
    defaultValue: taskStatus.PENDING
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Task.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Task;