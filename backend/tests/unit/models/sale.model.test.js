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
});