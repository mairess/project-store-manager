const { saleModel, productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);

  if (sale === undefined || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

const insertNew = async (salesProduct) => {
  const errorSchema = schema.validateCreateNewSale(salesProduct);
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };

  try {
    const arrayOfPromises = salesProduct.map(async (product) => {
      const id = product.productId;

      const theProductFromModel = await findById(id);

      if (theProductFromModel.status === 'NOT_FOUND') {
        throw new Error('Product not found');
      }
    });

    await Promise.all(arrayOfPromises);
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: error.message } };
  }

  const product = await saleModel.insertNew(salesProduct);
  return { status: 'CREATED', data: product };
};

const remove = async (saleId) => {
  const saleExists = await saleModel.findById(saleId);
  if (!saleExists.length) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  await saleModel.remove(saleId);
  return { status: 'NO_CONTENT', data: null };
};

const updateProductQuantity = async (saleId, productId, quantity) => {
  const errorSchema = schema.validateUpdateProductQuantity({ quantity });
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };

  const saleExists = await saleModel.findById(saleId);
  if (!saleExists || !saleExists.length) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  const productExists = await productModel.findById(productId);
  if (!productExists) {
    return { 
      status: 'NOT_FOUND', data: { message: 'Product not found in sale' },
    }; 
  }

  const product = await saleModel.updateProductQuantity(saleId, productId, quantity);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  findAll,
  findById,
  insertNew,
  remove,
  updateProductQuantity,
};