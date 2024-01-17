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

const notExistentProductMessageFromDB = {
  message: 'Product not found',
};

const notExistentProductMessageFromModel = {
  message: 'Product not found',
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceUnsuccessful = {
  status: 'NOT_FOUND',
  data: notExistentProductMessageFromModel,
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  notExistentProductMessageFromDB,
  notExistentProductMessageFromModel,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceUnsuccessful,
};