const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { 
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  notExistentProductMessageFromModel,
} = require('../mocks/sale.mock');
const { saleModel } = require('../../../src/models');

describe('Testing - SALES SERVICE', function () {
  it('Returns a successful HTTP status and the corresponding sales data.', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromDB);
    
    const serviceResponse = await saleService.findAll();

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(salesFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns a successful HTTP status and a specified sales data.', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromDB);
    
    const inputData = 1;
    const serviceResponse = await saleService.findById(inputData);

    expect(serviceResponse.status).to.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(saleFromModel);
  });

  it('Returns an unsuccessful HTTP status and a sales message.', async function () {
    sinon.stub(saleModel, 'findById').resolves(undefined);
    
    const inputData = 9929999;
    const serviceResponse = await saleService.findById(inputData);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal(notExistentProductMessageFromModel);
  });
});