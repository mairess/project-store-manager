const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');
const {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
} = require('../mocks/sale.mock');

describe('Testing - SALE MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all sales available.', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    
    const sales = await saleModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Returns a sale specified by id.', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    
    const inputData = 1;
    const sale = await saleModel.findById(inputData);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  it('Does not return a sale passing inexistent id.', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    
    const inputData = 99;
    const saleNotFoundMessage = await saleModel.findById(inputData);
    
    expect(saleNotFoundMessage).to.be.an('array');
    expect(saleNotFoundMessage).to.be.deep.equal([]);
  });

  it('Inserts a new sale.', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 26 }])
      .onSecondCall()
      .resolves([]);

    const inputData = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];

    const insertedSale = await saleModel.insertNew(inputData);

    expect(insertedSale).to.be.an('object');
    expect(insertedSale).to.be.deep.equal({
      id: 26,
      itemsSold: inputData,
    });
  });
});