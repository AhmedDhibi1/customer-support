const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ticketItem = require('./ticketItem');
const User = require('./user');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    required: true
  },
  description: {
    type: DataTypes.STRING,
    required: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Open',
  },
  priority: {
    type: DataTypes.STRING,
    required: true
  },
  agentId: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    required: true,
    defaultValue: DataTypes.NOW
    
  },
  uploadFile: {
    type: DataTypes.STRING,
    allowNull: true 
  }
});

Ticket.belongsTo(ticketItem, { defaultValue: 1 }); // Adds ticketItemId to Ticket model
ticketItem.hasMany(Ticket); // Optional, if you want to access Tickets from ticketItem
Ticket.belongsTo(User, { defaultValue: 1 }); // Adds UserId to Ticket model
User.hasMany(Ticket); // Optional, if you want to access Tickets from User


module.exports = Ticket;
