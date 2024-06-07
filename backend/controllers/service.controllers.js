const Service = require("../models/service");

async function create(serviceData) {
  return await Service.create(serviceData);
}

async function getAll() {
  return await Service.findAll();
}

async function getById(id) {
  return await Service.findByPk(id);
}

async function update(id, serviceData) {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error("Service not found");
  }
  await service.update(serviceData);
}

async function _delete(id) {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error("Service not found");
  }
  await service.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};
