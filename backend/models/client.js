const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Client = sequelize.define('Client', {
  // Inherits attributes from the User model
  priority: {
    type: DataTypes.INTEGER,
    required: true,
    defaultValue: 1
  }
});

Object.assign(Client, User);

module.exports = Client;