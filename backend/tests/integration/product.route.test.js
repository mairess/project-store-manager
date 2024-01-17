const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const { productsFromModel, productsFromDB, productFromDB, productFromModel } = require('../unit/mocks/product.mock');
const app = require('../../src/app');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Integration testing - PRODUCT ROUTE:', function () {
  it('Retrieve all products.', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const response = await chai.request(app).get('/products');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('Returns a product by specified id.', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const response = await chai.request(app).get('/products/3');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productFromModel);
  });
});