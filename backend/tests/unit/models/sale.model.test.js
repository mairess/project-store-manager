const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { 
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  notExistentProductMessageFromDB,
  notExistentProductMessageFromModel,
} = require('../mocks/sale.mock');

describe('Testing - SALE MODEL', function () {
  it('Returns all sales available.', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    
    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(salesFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns sales by specified id.', async function () {
    sinon.stub(connection, 'execute').resolves([[saleFromDB]]);
    
    const inputData = 3;
    const product = await productModel.findById(inputData);

    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(saleFromModel);
  });

  it('Does not return inexistent sales.', async function () {
    sinon.stub(connection, 'execute').resolves([[notExistentProductMessageFromDB]]);
    
    const inputData = 99;
    const productNotFoundMessage = await productModel.findById(inputData);
    
    expect(productNotFoundMessage).to.be.an('object');
    expect(productNotFoundMessage).to.be.deep.equal(notExistentProductMessageFromModel);
  });
});