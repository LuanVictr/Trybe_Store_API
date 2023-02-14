const productsServices = require('../services/Products.services');

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsServices.getAllProducts();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.getProductById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productInfo = req.body;
    const result = await productsServices.createProduct(productInfo);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};