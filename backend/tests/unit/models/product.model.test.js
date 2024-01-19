const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { 
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  notExistentProductMessageFromDB,
  notExistentProductMessageFromModel,
  newProductInsertIdFromDBSuccessful,
  newProductFromServiceSuccessful,
  updatedProductFromDB,
  updatedProductFromServiceSuccessful,
} = require('../mocks/product.mock');

chai.use(sinonChai);

describe('Testing - PRODUCT MODEL', function () {
  it('Returns all products available.', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    
    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns a product by specified id.', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    
    const inputData = 3;
    const product = await productModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Does not return inexistent product.', async function () {
    sinon.stub(connection, 'execute').resolves([[notExistentProductMessageFromDB]]);
    
    const inputData = 99;
    const productNotFoundMessage = await productModel.findById(inputData);
    
    expect(productNotFoundMessage).to.be.an('object');
    expect(productNotFoundMessage).to.be.deep.equal(notExistentProductMessageFromModel);
  });

  it('Creates a new product.', async function () {
    sinon.stub(connection, 'execute').resolves([newProductInsertIdFromDBSuccessful]);
    
    const inputData = 'Produto do bom';
    const newProduct = await productModel.insertNew(inputData);
    
    expect(newProduct).to.be.an('object');
    expect(newProduct).to.be.deep.equal(newProductFromServiceSuccessful);
  });

  it('Updates a product.', async function () {
    sinon.stub(connection, 'execute').resolves(updatedProductFromDB);
    
    const inputName = 'Capa do Batman';
    const inputId = 2;
    const newProduct = await productModel.update(inputId, inputName);
    
    expect(newProduct).to.be.an('object');
    expect(newProduct).to.be.deep.equal(updatedProductFromServiceSuccessful);
  });

  it('Deletes a product.', async function () {
    const connectionMocked = sinon.stub(connection, 'execute').resolves(undefined);
    
    const inputId = 2;
    await productModel.remove(inputId);

    sinon.assert.calledOnce(connectionMocked);
    
    expect(connectionMocked.called).to.equal(true);
  });
});