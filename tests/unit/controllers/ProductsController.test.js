const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/Products.services');
const productsController = require('../../../src/controllers/Products.controllers');
const products = require('../mocks/productsMock.json');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Testando as funções da camada controller', function () {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    res.send = sinon.stub().returns();
  })

  beforeEach(sinon.restore);
  it('Deve listar todos os pedidos', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(products);

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWithExactly(products);
  });

  it('Deve conseguir buscar um pedido pelo ID', async function () {
    req.params = { id: 1 }
    sinon.stub(productsService, 'getProductById').resolves(products[0]);
    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWithExactly(products[0]);
  });
});