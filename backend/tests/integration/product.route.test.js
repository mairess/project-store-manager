const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const { 
  productsFromModel,
  productsFromDB,
  productFromDB,
  productFromModel,
} = require('../unit/mocks/product.mock');
const app = require('../../src/app');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Integration testing - PRODUCT ROUTE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Retrieve all products.', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const response = await chai.request(app).get('/products');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsFromModel);
  });
  
  it('Returns a product by specified id.', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const response = await chai.request(app).get('/products/3');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productFromModel);
  });

  it('Does not create new product without key "name".', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await chai.request(app).post('/products');

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });

  it('Does not update a product missing key "name".', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await chai.request(app).put('/products/1').send({
      age: 'Martelo do Batman',
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });
});