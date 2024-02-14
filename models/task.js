const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
  }
});

module.exports = Task;