const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { 
  productsFromService,
  productsFromModel,
  productFromService,
  productFromModel,
  productNotFoundMessage,
  notFoundProductFromService,
  insertedProductFromService,
  updatedProductFromModel,
} = require('../mocks/product.mock.ts');

chai.use(sinonChai);

describe('Testing - PRODUCT CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all available products.', async function () {
    sinon.stub(productService, 'findAll').resolves(productsFromService);

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

  it('Returns a product by specified id.', async function () {
    sinon.stub(productService, 'findById').resolves(productFromService);

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

  it('Does not return a product passing inexistent id .', async function () {
    sinon.stub(productService, 'findById').resolves(notFoundProductFromService);

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
    expect(res.json).to.have.been.calledWith(productNotFoundMessage);
  });

  it('Does not return a product passing inexistent id. Status code 500.', async function () {
    const notFoundMessage = 'Product not founds'; 
    sinon.stub(productService, 'findById').resolves({ status: 'inexistentStatus',
      data: {
        message: notFoundMessage,
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
    expect(res.json).to.have.been.calledWith({ message: notFoundMessage });
  });

  it('Inserts a new product.', async function () {
    sinon.stub(productService, 'insertNew').resolves(insertedProductFromService);

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
    expect(res.json).to.have.been.calledWith(updatedProductFromModel);
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
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
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
    expect(res.json).to.have.been.calledWith({ 
      message: '"name" length must be at least 5 characters long',
    });
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