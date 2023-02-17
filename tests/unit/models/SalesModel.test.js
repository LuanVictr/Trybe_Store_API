const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/Sales.model')
const { productsForSale,AllSales } = require('../mocks/SalesMock');

chai.use(sinonChai)

describe('Testa o funcionamento da camada Model', function () {
  afterEach(sinon.restore);

  it('Deve retornar todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([AllSales]);
    const result = await salesModel.getAllSales();

    expect(result).to.be.deep.equal(AllSales);
  });
  it('Deve listar uma venda pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves(AllSales);

    const result = await salesModel.getSaleById(2);

    expect(result).to.be.deep.equal(AllSales[0]);
  });
});