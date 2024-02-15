const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const userRoles = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(...Object.values(userRoles)),
    allowNull: false,
    defaultValue: userRoles.USER
  }
});

module.exports = User;