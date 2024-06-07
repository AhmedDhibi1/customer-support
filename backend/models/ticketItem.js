const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicketItem = sequelize.define('TicketItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    required: true
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


module.exports = TicketItem;