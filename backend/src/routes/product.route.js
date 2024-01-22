const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/search', productController.search);
route.get('/', productController.findAll);
route.post('/', productController.insertNew);
route.get('/:id', productController.findById);
route.put('/:id', productController.update);
route.delete('/:id', productController.remove);

module.exports = route;