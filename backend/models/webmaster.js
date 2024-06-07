const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Admin = require('./admin');

const Webmaster = sequelize.define('Webmaster', {
}, {
  hooks: {
    beforeCreate: (webmaster) => {
      webmaster.role = 'webmaster'; 
    }
  }
});

Object.assign(Webmaster, Admin);

module.exports = Webmaster;