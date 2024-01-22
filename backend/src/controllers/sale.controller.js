const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await saleService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNew = async (req, res) => {
  const products = req.body;
  const { status, data } = await saleService.insertNew(products);
  return res.status(mapStatusHTTP(status)).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.remove(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await saleService.update(saleId, productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  insertNew,
  remove,
  update,
};