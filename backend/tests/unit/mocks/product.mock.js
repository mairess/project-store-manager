const traje = 'Traje de encolhimento';
const productsFromDB = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: traje },
  { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
];

const productsFromModel = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: traje },
  { id: 3, name: 'Escudo do CapitÃ£o AmÃ©rica' },
];

const productFromDB = { id: 2, name: traje };

const productFromModel = { id: 2, name: traje };

const insertedProductFromModel = { id: 26, name: 'Produto do bom' };

const updatedProductFromModel = {
  id: 2,
  name: 'Capa do Batman',
};

const toUpdateProductFromModel = {
  id: 2,
  name: traje,
};

const productsFromService = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromService = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productNotFoundMessage = {
  message: 'Product not found',
};

const notFoundProductFromService = {
  status: 'NOT_FOUND',
  data: productNotFoundMessage,
};

const insertedProductFromService = {
  status: 'CREATED',
  data: updatedProductFromModel,
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  insertedProductFromModel,
  updatedProductFromModel,
  toUpdateProductFromModel,
  productsFromService,
  productFromService,
  productNotFoundMessage,
  notFoundProductFromService,
  insertedProductFromService,
};
