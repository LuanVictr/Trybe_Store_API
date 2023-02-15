const Joi = require('joi');
const salesModel = require('../models/Sales.model');
const productsModel = require('../models/Products.model');

const salesSchemma = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const createSale = async (sales) => {
  try {
    const saleId = await salesModel.registerSale();
    sales.forEach(async ({ productId, quantity }) => {
      salesSchemma.validate({ productId, quantity });
      const product = productsModel.getProductById(productId);
      if (!product) {
        const errorObject = { status: 404, message: 'Product not found' };
        throw errorObject;
      }
      await salesModel.createSale(saleId, productId, quantity);
    });
    return { id: saleId, itemsSold: sales };
  } catch (error) {
    if (error) {
      const errorObject = { status: 400, message: error.message };
      throw errorObject;
    }
  }
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  if (result.length === 0) {
    const errorObject = { status: 404, message: 'Sale not found' };
    throw errorObject;
  }
  return result;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};