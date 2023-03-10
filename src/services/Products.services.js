const Joi = require('joi');
const productsModel = require('../models/Products.model');

const productSchemma = Joi.object({
  name: Joi.string().min(5).required(),
});

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const [result] = await productsModel.getProductById(id);
  if (!result) {
    const errorObject = { status: 404, message: 'Product not found' };
    throw errorObject;
  }
  return result;
};

const createProduct = async (productInfo) => {
  const { error } = productSchemma.validate(productInfo);
  if (error) {
    const errorObject = {
      status: error.details[0].type === 'string.min' ? 422 : 400, message: error.message,
    };
    throw errorObject;
  }
  const result = await productsModel.createProduct(productInfo);
  const product = { id: result, name: productInfo.name };
  return product;
};

const updateProduct = async (infoToUpdate, id) => {
  const productExists = await productsModel.getProductById(id);
  if (productExists.length === 0) {
    const errorObject = { status: 404, message: 'Product not found' };
    throw errorObject;
  }
  const { error } = productSchemma.validate(infoToUpdate);
  if (error) {
    const errorObject = {
      status: error.details[0].type === 'string.min' ? 422 : 400, message: error.message,
    };
    throw errorObject;
  }
  await productsModel.updateProduct(infoToUpdate.name, id);
  const [result] = await productsModel.getProductById(id);
  return result;
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product.length === 0) {
    const errorObject = { status: 404, message: 'Product not found' };
    throw errorObject;
  }
  const result = await productsModel.deleteProduct(id);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};