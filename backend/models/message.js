// message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Ticket = require('./ticket'); // Assuming you have a Ticket model

const Message = sequelize.define('Message', {
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
 },
 message : {
    type: DataTypes.TEXT,
    allowNull: false
 },
 createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
 }
});

// Associations
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(Ticket, { foreignKey: 'ticketId' });

User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
Ticket.hasMany(Message, { foreignKey: 'ticketId' });

module.exports = Message;