const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const app = require('../../src/app');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Integration testing - SALE ROUTE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Does not update product quantity missing property "quantity".', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await chai.request(app).put('/sales/2/products/1/quantity').send({
      age: 10,
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
  });

  it('Does not update product quantity when quantity <= 0.', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await chai.request(app).put('/sales/2/products/1/quantity').send({
      quantity: -10,
    });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ 
      message: '"quantity" must be greater than or equal to 1',
    });
  });
});