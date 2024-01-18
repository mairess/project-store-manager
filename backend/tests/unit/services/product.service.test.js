const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { 
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  notExistentProductMessageFromModel,
  createdProductFromDBSuccessful,
  createdProductFromServiceSuccessful,
} = require('../mocks/product.mock');
const { productModel } = require('../../../src/models');

describe('Testing - PRODUCT SERVICE', function () {
  it('Returns a successful HTTP status and the corresponding product data.', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);
    
    const serviceResponse = await productService.findAll();

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns a successful HTTP status and a specified product data.', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromDB);
    
    const inputData = 3;
    const serviceResponse = await productService.findById(inputData);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(productFromModel);
  });

  it('Returns an unsuccessful HTTP status and a specified message.', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    
    const inputData = 9929999;
    const serviceResponse = await productService.findById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal(notExistentProductMessageFromModel);
  });

  it('Create new product and returns successful HTTP status and created product.', async function () {
    sinon.stub(productModel, 'insertNewProduct').resolves(createdProductFromDBSuccessful);
    
    const inputData = 'Produto do bom';
    const serviceResponse = await productService.insertNewProduct(inputData);

    expect(serviceResponse.status).to.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(createdProductFromServiceSuccessful);
  });
});