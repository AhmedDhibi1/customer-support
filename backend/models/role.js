// role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Permission = require('./permission');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    required: true
  }
});

Role.setDefaultRole = async function() {
  const [defaultRole, created] = await Role.findOrCreate({
    where: { name: 'webmaster' },
    defaults: { name: 'webmaster' }
  });
  return defaultRole;
};


Role.belongsToMany(Permission, { through: 'RolePermission' }); // Creates RolePermission table
Permission.belongsToMany(Role, { through: 'RolePermission' }); // Creates RolePermission table

module.exports = Role;