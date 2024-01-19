const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.findAll);
route.post('/', productController.insertNewOne);
route.get('/:id', productController.findById);

module.exports = route;