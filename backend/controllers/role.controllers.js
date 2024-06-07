const Role = require("../models/role");
const Permission = require('../models/permission');
const User = require('../models/user');
async function getAll() {
  try {
    return await Role.findAll();
  } catch (error) {
    throw new Error("Error fetching roles");
  }
}

async function getById(id) {
  return await Role.findByPk(id);
}

async function create(roleParam) {
  if (!roleParam || !roleParam.name) {
    throw new Error("Invalid role parameters provided");
  }

  try {
    return await Role.create({
      name: roleParam.name
    });
  } catch (error) {
    throw new Error(`Error creating role: ${error.message}`);
  }
}

async function update(id, roleParam) {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error("Role not found");
  }

  try {
    await role.update(roleParam);
    return role;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
}

async function remove(id) {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error("Role not found");
  }

  try {
    await User.destroy({
      where: {
         RoleId: id 
      }
   });
    await role.destroy();
  } catch (error) {
    throw new Error(`Error deleting role: ${error.message}`);
  }
}

async function addPermissionToRole(roleId, permissionId) {
  try {
    // Find the role and permission
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);
    console.log('role:', role);
    console.log('permission:', permission);

    // Check if both role and permission exist
    if (!role || !permission) {
      throw new Error("Role or permission not found");
    }

    // Add the permission to the role
    await role.addPermission(permission);

    // Return success message or any other relevant data
    return { message: "Permission added to role successfully" };
  } catch (error) {
    throw error;
  }
}
async function getPermissionsOfRole(roleId) {
  try {
    // Find the role
    const role = await Role.findByPk(roleId);

    // Check if the role exists
    if (!role) {
      throw new Error("Role not found");
    }

    // Load the permissions separately
    const permissions = await role.getPermissions();

    // Log the role and its associated permissions
    console.log('role:', role.toJSON());
    console.log('permissions:', permissions);

    // Return the permissions of the role
    return permissions;
  } catch (error) {
    console.error('Error in getPermissionsOfRole:', error);
    throw error;
  }
}

 async function removePermissionFromRole(roleId, permissionId) {
  try {
     // Find the role and permission
     const role = await Role.findByPk(roleId);
     const permission = await Permission.findByPk(permissionId);
 
     // Check if both role and permission exist
     if (!role || !permission) {
       throw new Error("Role or permission not found");
     }
 
     // Remove the permission from the role
     await role.removePermission(permission);
 
     // Return success message or any other relevant data
     return { message: "Permission removed from role successfully" };
  } catch (error) {
     throw error;
  }
 }

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  addPermissionToRole,
  getPermissionsOfRole,
  removePermissionFromRole
};