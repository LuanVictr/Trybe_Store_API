const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getProductById = async (id) => {
  const query = `SELECT * FROM StoreManager.products WHERE id = ${id} `;
  const [result] = await connection.execute(query);
  return result;
};

const createProduct = async (productInfo) => {
  const query = 'INSERT INTO StoreManager.products(name) VALUES(?)';
  const [result] = await connection.execute(query, [productInfo.name]);
  return result.insertId;
};

const updateProduct = async (infoToUpdate, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const result = await connection.execute(query, [infoToUpdate, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};