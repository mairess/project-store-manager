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

const newProductFromDBSuccessful = { id: 26, name: 'Produto do bom' };

const newProductInsertIdFromDBSuccessful = { insertId: 26 };

const newProductFromServiceSuccessful = { id: 26, name: 'Produto do bom' };

const createdProductFromDBSuccessful = {
  status: 'CREATED',
  data: newProductFromDBSuccessful,
};

const createdProductFromServiceSuccessful = {
  status: 'CREATED',
  data: newProductFromServiceSuccessful,
};

const schemaNameMinCharMessage = {
  message: '"name" is required',
};

const schemaNameRequiredMessage = {
  message: '"name" length must be at least 5 characters long',
};
const createdProductFromServiceUnsuccessful = {
  status: 'BAD_REQUEST',
  data: schemaNameMinCharMessage,
};

const updatedProductFromDB = {
  id: 2,
  name: 'Capa do Batman',
};

const updatedProductFromServiceSuccessful = {
  id: 2,
  name: 'Capa do Batman',
};

const updatedProductSuccessfulFromModel = {
  id: 2,
  name: 'Capa do Batman',
};

const updatedProductSuccessfulFromService = {
  id: 2,
  name: 'Capa do Batman',
};

const toUpdateProductFromModel = {
  id: 2,
  name: 'Traje de encolhimento',
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
  newProductFromDBSuccessful,
  newProductFromServiceSuccessful,
  createdProductFromDBSuccessful,
  createdProductFromServiceSuccessful,
  schemaNameMinCharMessage,
  schemaNameRequiredMessage,
  createdProductFromServiceUnsuccessful,
  newProductInsertIdFromDBSuccessful,
  updatedProductFromDB,
  updatedProductFromServiceSuccessful,
  updatedProductSuccessfulFromModel,
  toUpdateProductFromModel,
  updatedProductSuccessfulFromService,
};