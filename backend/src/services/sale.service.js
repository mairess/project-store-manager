const { saleModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  console.log('findAll', sales);
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

module.exports = {
  findAll,
  findById,
  insertNew,
};