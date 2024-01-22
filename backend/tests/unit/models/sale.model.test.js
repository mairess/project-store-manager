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
    
    expect(connection.execute.secondCall.args[1]).to.deep.equal([26, 1, 1]);
    expect(connection.execute.thirdCall.args[1]).to.deep.equal([26, 2, 5]);

    expect(insertedSale).to.be.an('object');
    expect(insertedSale).to.be.deep.equal({
      id: 26,
      itemsSold: inputData,
    });
  });

  it('Updates product quantity of a sale.', async function () {
    const mockedDate = new Date('2024-01-22T12:56:58.564Z');
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    sinon.useFakeTimers(mockedDate);

    const saleId = 1; 
    const productId = 1; 
    const quantity = 20;

    const updatedQuantity = await saleModel.updateProductQuantity(saleId, productId, quantity);
    
    expect(updatedQuantity).to.be.an('object');
    expect(updatedQuantity).to.be.deep.equal({
      date: '2024-01-22T12:56:58.564Z',
      productId: 1,
      quantity: 20,
      saleId: 1,
    });
  });
});