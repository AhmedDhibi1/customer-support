const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Agent = require('./agent');

const Admin = sequelize.define('Admin', {
}, {
  hooks: {
    beforeCreate: (admin) => {
      admin.role = 'admin';
    }
  }
});
Object.assign(Admin, Agent);
module.exports = Admin;