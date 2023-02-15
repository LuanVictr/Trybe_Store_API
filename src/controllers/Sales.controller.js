const salesServices = require('../services/Sales.services');

const createSale = async (req, res) => {
  try {
    const sales = req.body;
    const result = await salesServices.createSale(sales);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllSales = async (_req, res) => {
  const result = await salesServices.getAllSales();
  res.status(200).send(result);
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesServices.getSaleById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};