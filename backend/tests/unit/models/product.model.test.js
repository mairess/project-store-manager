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
  insertedProductFromModel,
  updatedProductFromModel,
} = require('../mocks/product.mock');

chai.use(sinonChai);

describe('Testing - PRODUCT MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all products available.', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    
    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Returns a product specified by id.', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    
    const inputData = 2;
    const product = await productModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Does not return a product passing inexistent id.', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    
    const inputData = 99;
    const productNotFoundMessage = await productModel.findById(inputData);
    
    expect(productNotFoundMessage).to.equal(undefined);
  });

  it('Creates a new product.', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 26 }]);
    
    const inputData = 'Produto do bom';
    const newProduct = await productModel.insertNew(inputData);
    
    expect(newProduct).to.be.an('object');
    expect(newProduct).to.be.deep.equal(insertedProductFromModel);
  });

  it('Updates a product.', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    
    const inputName = 'Capa do Batman';
    const inputId = 2;
    const newProduct = await productModel.update(inputId, inputName);
    
    expect(newProduct).to.be.an('object');
    expect(newProduct).to.be.deep.equal(updatedProductFromModel);
  });

  it('Removes a product.', async function () {
    const connectionMocked = sinon.stub(connection, 'execute').resolves(undefined);
    
    const inputId = 2;
    await productModel.remove(inputId);

    sinon.assert.calledOnce(connectionMocked);
    
    expect(connectionMocked.called).to.equal(true);
  });
});