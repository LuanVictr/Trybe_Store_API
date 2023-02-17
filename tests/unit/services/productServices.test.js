const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/Products.services')
const productsModel = require('../../../src/models/Products.model');
const products = require('../mocks/productsMock.json');

describe('Testa funcionalidades da camada Services', function () {
  afterEach(sinon.restore);

  it('Deve retornar todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(products);
    
    const result = await productsService.getAllProducts();

    expect(result).to.be.deep.equal(products);
  })

  it('Deve retornar um produto pelo id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([products]);

    const result = await productsService.getProductById(1);
    expect(result[0]).to.be.deep.equal(products[0]);
  });

  it('Deve ser possivel cadastrar um novo produto', async function () {
    sinon.stub(productsModel, 'createProduct').resolves(4)
    const expectedObject = { id: 4, name: 'lilica' }
    const productInfo = { name: 'lilica' }
    const result = await productsService.createProduct(productInfo);

    expect(result).to.be.deep.equal(expectedObject);
  });
});