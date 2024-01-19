const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const insertNewOne = async (name) => {
  const error = schema.validateCreateNewProduct({ name });
  if (error) return { status: error.status, data: { message: error.message } };
  const product = await productModel.insertNewOne(name);
  return { status: 'CREATED', data: product };
};

module.exports = {
  findAll,
  findById,
  insertNewOne,
};