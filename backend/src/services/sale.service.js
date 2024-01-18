const { saleModel } = require('../models');

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
  const product = await saleModel.insertNewSale(products);
  return { status: 'CREATED', data: product };
};

module.exports = {
  findAll,
  findById,
  insertNewSale,
};