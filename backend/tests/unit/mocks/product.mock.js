const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productFromDB = {
  id: 3,
  name: 'Escudo do Capitão América',
};

const productFromModel = {
  id: 3,
  name: 'Escudo do Capitão América',
};

const notExistentProductFromDB = {
  message: 'Product not found',
};

const notExistentProductFromModel = {
  message: 'Product not found',
};

const ProductsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const ProductFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const ProductFromServiceUnsuccessful = {
  status: 'NOT_FOUND',
  data: notExistentProductFromModel,
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  notExistentProductFromDB,
  notExistentProductFromModel,
  ProductsFromServiceSuccessful,
  ProductFromServiceSuccessful,
  ProductFromServiceUnsuccessful,
};