const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  findAll,
  findById,
};