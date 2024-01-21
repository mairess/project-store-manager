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
    date: theDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: theDate,
    productId: 2,
    quantity: 10,
  },
];

const saleFromModel = [
  {
    date: theDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: theDate,
    productId: 2,
    quantity: 10,
  },
];

const salesFromService = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromService = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleNotFoundMessage = {
  message: 'Sale not found',
};

const saleNoFoundFromService = {
  status: 'NOT_FOUND',
  data: saleNotFoundMessage,
};

const insertedSaleFromModel = {
  id: 5,
  itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }],
};

const insertedSaleFromService = {
  status: 'CREATED',
  data: insertedSaleFromModel,
};

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  salesFromService,
  saleFromService,
  saleNotFoundMessage,
  saleNoFoundFromService,
  insertedSaleFromService,
  insertedSaleFromModel,
};