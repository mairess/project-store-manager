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
  insertedSaleFromService,
  insertedSaleFromModel,
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
      json: sinon.stub().withArgs(saleFromModel),
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
      json: sinon.stub().withArgs(saleNotFoundMessage),
    };
    
    await saleController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleNotFoundMessage);
  });

  it('Inserts a new sale.', async function () {
    sinon.stub(saleService, 'insertNew').resolves(insertedSaleFromService);

    const req = {
      params: { },
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await saleController.insertNew(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json.getCall(0).args[0]).to.deep.equal(insertedSaleFromModel);
  });

  it('Removes a sale.', async function () {
    sinon.stub(saleService, 'remove').resolves({ status: 'NO_CONTENT', data: null });

    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await saleController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(null);
  });
});