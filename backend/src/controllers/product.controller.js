const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNew = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.insertNew(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productService.update(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.remove(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  insertNew,
  update,
  remove,
};