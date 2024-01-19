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

const insertNew = async (name) => {
  const errorSchema = schema.validateCreateNewProduct({ name });
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };
  const product = await productModel.insertNew(name);
  return { status: 'CREATED', data: product };
};

const update = async (productId, name) => {
  const errorSchema = schema.validateCreateNewProduct({ name });
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };
  const productExists = await productModel.findById(productId);
  if (!productExists) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const product = await productModel.update(productId, name);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  findAll,
  findById,
  insertNew,
  update,
};