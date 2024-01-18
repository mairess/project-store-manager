const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.findAll);
route.post('/', productController.insertNewProduct);
route.get('/:id', productController.findById);

module.exports = route;