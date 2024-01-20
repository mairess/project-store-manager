const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { 
  salesFromService,
  salesFromModel,
  saleFromService,
  saleFromModel,
  saleNotFoundMessage,
  saleNoFoundFromService,
} = require('../mocks/sale.mock');

chai.use(sinonChai);

describe('Testing - SALE CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all available sales.', async function () {
    sinon.stub(saleService, 'findAll').resolves(salesFromService);

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

  it('Returns a sale specified by id.', async function () {
    sinon.stub(saleService, 'findById').resolves(saleFromService);

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

  it('Does not return a sale passing inexistent id.', async function () {
    sinon.stub(saleService, 'findById').resolves(saleNoFoundFromService);

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
    expect(res.json).to.have.been.calledWith(saleNotFoundMessage);
  });
});