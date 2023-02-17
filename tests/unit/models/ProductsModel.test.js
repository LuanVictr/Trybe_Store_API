const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/Products.model');
const products = require('../mocks/productsMock.json');


describe('Testa o funcionamento da aplicação', function () {
  afterEach(sinon.restore);

  it('Deve retornar todas os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.getAllProducts();
    
    expect(result).to.be.deep.equal(products);
  });
  it('Deve listar um produto pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getProductById(2);

    expect(result[0]).to.be.deep.equal(products[0]);
  });
});