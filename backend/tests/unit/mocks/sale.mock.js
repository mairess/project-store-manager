const theDate = '2024-01-17T20:28:07.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date: theDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: theDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: theDate,
    productId: 3,
    quantity: 15,
  },
];
  
const salesFromModel = [
  {
    saleId: 1,
    date: theDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: theDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: theDate,
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date: 'theDate',
    productId: 1,
    quantity: 5,
  },
  {
    date: 'theDate',
    productId: 2,
    quantity: 10,
  },
];
  
const saleFromModel = [
  {
    date: 'theDate',
    productId: 1,
    quantity: 5,
  },
  {
    date: 'theDate',
    productId: 2,
    quantity: 10,
  },
];

const notExistentProductMessageFromDB = {
  message: 'Product not found',
};
  
const notExistentProductMessageFromModel = {
  message: 'Product not found',
};

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  notExistentProductMessageFromDB,
  notExistentProductMessageFromModel,
};