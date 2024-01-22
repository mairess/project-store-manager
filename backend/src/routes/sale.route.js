const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.findAll);
route.post('/', saleController.insertNew);
route.get('/:id', saleController.findById);
route.delete('/:id', saleController.remove);

module.exports = route;