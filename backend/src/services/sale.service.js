const { saleModel } = require('../models');
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

const insertNewSale = async (products) => {
  const errorSchema = schema.validateCreateNewSale(products);
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };

  const arrayOfPromises = products.map(async (product) => {
    const id = product.productId;

    const theProductFromModel = await findById(id);

    if (theProductFromModel.status === 'NOT_FOUND') {
      throw new Error('Product not found');
    }
  });

  try {
    await Promise.all(arrayOfPromises);
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: error.message } };
  }

  const product = await saleModel.insertNewSale(products);
  return { status: 'CREATED', data: product };
};

module.exports = {
  findAll,
  findById,
  insertNewSale,
};