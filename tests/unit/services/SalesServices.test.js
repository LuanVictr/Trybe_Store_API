const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/Sales.model')
const salesService = require('../../../src/services/Sales.services');
const { productsForSale, AllSales } = require('../mocks/SalesMock');

chai.use(sinonChai);

describe('Testa funcionalidades da camada Sales Services', function () {
  afterEach(sinon.restore);

  it('Deve retornar todos as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(AllSales);

    const result = await salesService.getAllSales();

    expect(result).to.be.deep.equal(AllSales);
  })

  it('Deve retornar um produto pelo id', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(AllSales[0]);

    const result = await salesService.getSaleById(1);
    expect(result).to.be.deep.equal(AllSales[0]);
  });
});