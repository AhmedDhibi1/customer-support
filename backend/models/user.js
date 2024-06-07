// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  homeAddress: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


User.belongsTo(Role); // Adds roleId to User model
Role.hasMany(User); // Optional, if you want to access users from Role

module.exports = User;