const Product = require("../models/product");

async function create(productData) {
  return await Product.create(productData);
}

async function getAll() {
  return await Product.findAll();
}

async function getById(id) {
  return await Product.findByPk(id);
}

async function update(id, productData) {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.update(productData);
}

async function _delete(id) {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  await product.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};
