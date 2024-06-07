const Permission = require("../models/permission");

async function create(permissionData) {
  return await Permission.create(permissionData);
}

async function getAll() {
  console.log('getAll');
  return await Permission.findAll();
}

async function getById(id) {
  return await Permission.findByPk(id);
}

async function update(id, permissionData) {
  const permission = await Permission.findByPk(id);
  if (!permission) {
    throw new Error("Permission not found");
  }
  await permission.update(permissionData);
}

async function _delete(id) {
  const permission = await Permission.findByPk(id);
  if (!permission) {
    throw new Error("Permission not found");
  }
  await permission.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};
