const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/Sales.controller')
const salesService = require('../../../src/services/Sales.services');
const { productsForSale, AllSales } = require('../mocks/SalesMock');

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
  it('Deve listar todas as vendas', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(AllSales);

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWithExactly(AllSales);
  });

  it('Deve conseguir buscar um pedido pelo ID', async function () {
    req.params = { id: 1 }
    sinon.stub(salesService, 'getSaleById').resolves(AllSales[0]);
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWithExactly(AllSales[0]);
  });
});