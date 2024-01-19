const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { 
  productsFromServiceSuccessful,
  productsFromModel,
  productFromServiceSuccessful,
  productFromModel,
  notExistentProductMessageFromModel,
  productFromServiceUnsuccessful,
  createdProductFromServiceSuccessful,
  newProductFromServiceSuccessful,
  schemaNameMinCharMessage,
  schemaNameRequiredMessage,
} = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Testing - PRODUCT CONTROLLER', function () {
  it('Returns a successful HTTP status and the corresponding product data.', async function () {
    sinon.stub(productService, 'findAll').resolves(productsFromServiceSuccessful);

    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns a successful HTTP status and a specified product data.', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceSuccessful);

    const req = {
      params: { id: 3 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Returns an unsuccessful HTTP status and a specified message.', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceUnsuccessful);

    const req = {
      params: { id: 999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notExistentProductMessageFromModel);
  });

  it('Returns an internal server error HTTP status.', async function () {
    sinon.stub(productService, 'findById').resolves({ status: 'inexistentStatus',
      data: {
        message: 'Product not found',
      } });

    const req = {
      params: { id: 999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith(notExistentProductMessageFromModel);
  });

  it('Create new product and returns a successful HTTP status and the corresponding product data.', async function () {
    sinon.stub(productService, 'insertNew').resolves(createdProductFromServiceSuccessful);

    const req = {
      params: { },
      body: { name: 'Produto do bom' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.insertNew(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromServiceSuccessful);
  });

  it('Does not update product missing key "name".', async function () {
    sinon.stub(productService, 'update').resolves(undefined);
    sinon.stub(productService, 'findById').resolves(undefined);

    const req = {
      params: { id: 2 },
      body: { age: 'Produto do bom' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.insertNew(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(schemaNameMinCharMessage);
  });

  it('Does not update product with name lass than 5 characters.', async function () {
    sinon.stub(productService, 'update').resolves(undefined);
    sinon.stub(productService, 'findById').resolves(undefined);

    const req = {
      params: { id: 2 },
      body: { name: 'Capa' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.insertNew(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(schemaNameRequiredMessage);
  });

  it('Deletes a product.', async function () {
    sinon.stub(productService, 'remove').resolves({ status: 'NO_CONTENT', data: null });
    sinon.stub(productService, 'findById').resolves({ id: 3, name: 'Escudo do Capitão América' });

    const req = {
      params: { id: 3 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(null);
  });

  it('Does not delete product not found.', async function () {
    sinon.stub(productService, 'remove').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    sinon.stub(productService, 'findById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
      params: { id: 3999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productController.remove(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});