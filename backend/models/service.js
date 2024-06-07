// models/service.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    required: true
  },
  ref: {
    type: DataTypes.STRING,
    required: true
  }
});

module.exports = Service;
