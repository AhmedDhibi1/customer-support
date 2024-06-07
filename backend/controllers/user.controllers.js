const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const  User = require("../models/user");
const Role = require("../models/role");
const Ticket = require("../models/ticket");
roleServices = require("./role.controllers");

async function getAll(req, res) {

  try {
     return await User.findAll();
  } catch (err) {
     throw new Error('Error fetching users');
  }
 }
async function getById(id) {
  return await User.findByPk(id);
}
async function create(userParam) {
  if (!userParam || !userParam.email || !userParam.password) {
    throw 'Invalid user parameters provided';
  }

  const existingUser = await User.findOne({ where: { email: userParam.email } });
  if (existingUser) {
    throw `This email already exists: ${userParam.email}`;
  }

  const hashedPassword = bcrypt.hashSync(userParam.password, 10);
  await User.create({
    RoleId:1,
    firstName: userParam.firstName,
    lastName: userParam.lastName,
    email: userParam.email,
    password: hashedPassword,
    homeAddress: userParam.homeAddress
  });
}

async function update(id, userParam) {
  console.log('userParam:', userParam);
  const user = await User.findByPk(id);
  if (!user) {
    throw "User not found.";
  }

  if (user.email !== userParam.email) {
    const existingUser = await User.findOne({ where: { email: userParam.email } });
    if (existingUser) {
      throw `User with email ${userParam.email} already exists.`;
    }
  }
  
  if (userParam.roleId) {
    const role = await Role.findByPk(userParam.roleId);
    if (!role) {
      throw "Role not found.";
    }
    // Update userParam.RoleId with the fetched role's ID
    userParam.RoleId = role.id;
    console.log('role:', role);
  }

  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  await user.update(userParam);
  console.log('User:', user);
  console.log('User with id:', id, 'updated successfully.');
}

async function _delete(userId) {
  await Ticket.destroy({
     where: {
       UserId: userId 
     }
  });
 

  await User.destroy({
     where: {
       id: userId
     }
  });

  console.log('---------------------------User with id:', userId, 'deleted successfully.');

 }

async function checkPermission(userId, permissionName) {
  try {   
    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

   const role = await roleServices.getById(user.RoleId);
    if (!role) {
      console.log('User does not have a role');
      throw new Error('User does not have a role');
    }

    // Get the permissions associated with the role
    const permissions = await role.getPermissions();
    if (!permissions || permissions.length == 0) {
      console.log('Role does not have any permissions');
      return false;
    }
 

    // Check if the permission name exists in the list of permissions
    const hasPermission = permissions.some(permission => permission.name === permissionName);
    console.log('Has permission:', hasPermission);
    return hasPermission;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  checkPermission,
};