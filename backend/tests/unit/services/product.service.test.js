const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { 
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  createdProductFromDBSuccessful,
  createdProductFromServiceSuccessful,
} = require('../mocks/product.mock');

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
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Creates new product and returns successful HTTP status and created product.', async function () {
    sinon.stub(productModel, 'insertNew').resolves(createdProductFromDBSuccessful);
    
    const inputData = 'Produto do bom';
    const serviceResponse = await productService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(createdProductFromServiceSuccessful);
  });

  it('Does not create new product with name lass than 5 characters.', async function () {
    sinon.stub(productModel, 'insertNew').resolves(undefined);
    
    const inputData = 'aaa';
    const serviceResponse = await productService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('INVALID_VALUE');
    expect(serviceResponse.data).to.be.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Update a product - SERVICE.', async function () {
    sinon.stub(productModel, 'update').resolves({ id: 2, name: 'Capa do Batman' });
    sinon.stub(productModel, 'findById').resolves({ id: 2, name: 'Traje de encolhimento' });
    
    const inputName = 'Capa do Batman';
    const inputId = 2;
    const serviceResponse = await productService.update(inputId, inputName);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal({
      id: 2,
      name: 'Capa do Batman',
    });
  });

  it('Does not update product that not exists - SERVICE.', async function () {
    sinon.stub(productModel, 'update').resolves(undefined);
    sinon.stub(productModel, 'findById').resolves(undefined);
    
    const inputName = 'Capa do Batman';
    const inputId = 99999;
    const serviceResponse = await productService.update(inputId, inputName);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deletes a product.', async function () {
    sinon.stub(productModel, 'remove').resolves({ id: 1, affectedRows: 1 });
    sinon.stub(productModel, 'findById').resolves({ id: 1, name: 'Martelo de Thor' });
    
    const inputId = 1;
    const serviceResponse = await productService.remove(inputId);

    expect(serviceResponse.status).to.equal('NO_CONTENT');
    expect(serviceResponse.data).to.be.deep.equal(null);
  });
});