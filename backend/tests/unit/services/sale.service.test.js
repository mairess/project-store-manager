const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { 
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
} = require('../mocks/sale.mock');
const { saleModel } = require('../../../src/models');

describe('Testing - SALES SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all sales available.', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromDB);
    
    const serviceResponse = await saleService.findAll();

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(salesFromModel);
  });

  it('Returns a sale specified by id.', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromDB);
    
    const inputData = 1;
    const serviceResponse = await saleService.findById(inputData);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(saleFromModel);
  });

  it('Does not return a sale passing inexistent id.', async function () {
    sinon.stub(saleModel, 'findById').resolves([]);
    
    const inputData = 9929999;
    const serviceResponse = await saleService.findById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Inserts a sale.', async function () {
    const expectedData = {
      id: 26,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    sinon.stub(saleModel, 'insertNew').resolves(expectedData);
    sinon.stub(saleModel, 'findById').resolves([{ }]);
    
    const inputData = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    const serviceResponse = await saleService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(expectedData);
  });

  it('Does not insert a sale with product is not found.', async function () {
    sinon.stub(saleModel, 'insertNew').resolves();
    sinon.stub(saleModel, 'findById').resolves();
    
    const inputData = [
      { productId: 199, quantity: 11012 },
      { productId: 2, quantity: 5 },
    ];
    const serviceResponse = await saleService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Does not insert a sale missing property "productId".', async function () {
    sinon.stub(saleModel, 'insertNew').resolves();
    sinon.stub(saleModel, 'findById').resolves();
    
    const inputData = [
      { missingId: 1, quantity: 11 },
      { missingId: 2, quantity: 5 },
    ];
    const serviceResponse = await saleService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('BAD_REQUEST');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"productId" is required' });
  });

  it('Does not insert a sale missing property "quantity".', async function () {
    sinon.stub(saleModel, 'insertNew').resolves();
    sinon.stub(saleModel, 'findById').resolves();
    
    const inputData = [
      { productId: 1, age: 11 },
      { productId: 2, age: 5 },
    ];
    const serviceResponse = await saleService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('BAD_REQUEST');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"quantity" is required' });
  });

  it('Does not insert a sale with "quantity" property equal 0.', async function () {
    sinon.stub(saleModel, 'insertNew').resolves(undefined);
    
    const inputData = [
      { productId: 1, quantity: 0 },
      { productId: 2, quantity: 0 },
    ];
    const serviceResponse = await saleService.insertNew(inputData);

    expect(serviceResponse.status).to.equal('INVALID_VALUE');
    expect(serviceResponse.data).to.be.deep.equal({
      message: '"quantity" must be greater than or equal to 1',
    });
  });
});