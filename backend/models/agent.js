const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Agent = sequelize.define('Agent', {
  // Inherits attributes from the User model
  status: {
    type: DataTypes.STRING,
    required: true,
    defaultValue: 'active' 
  }
}, {
  hooks: {
    beforeCreate: (agent) => {
      agent.role = 'agent';
    }
  }
});

// Extending User model
Object.assign(Agent, User);

module.exports = Agent;
