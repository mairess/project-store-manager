const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleService } = require('../../../src/services');
const { 
  salesFromServiceSuccessful,
  salesFromModel,
  saleFromServiceSuccessful,
  saleFromModel,
  saleFromServiceUnsuccessful,
  notExistentSaleMessageFromModel,
} = require('../mocks/sale.mock');
const { saleController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Testing - SALE CONTROLLER', function () {
  it('Returns a successful HTTP status and the corresponding sale data.', async function () {
    sinon.stub(saleService, 'findAll').resolves(salesFromServiceSuccessful);

    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await saleController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Returns a successful HTTP status and a specified sale data.', async function () {
    sinon.stub(saleService, 'findById').resolves(saleFromServiceSuccessful);

    const req = {
      params: { id: 3 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await saleController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Returns an unsuccessful HTTP status and a specified message.', async function () {
    sinon.stub(saleService, 'findById').resolves(saleFromServiceUnsuccessful);

    const req = {
      params: { id: 999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await saleController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notExistentSaleMessageFromModel);
  });
});