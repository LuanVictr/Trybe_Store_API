const connection = require('./connection');

const createSale = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id,product_id,quantity) VALUES(?,?,?)`;
  const [result] = await connection.execute(query, [saleId, productId, quantity]);
  return result.insertId;
};

const registerSale = async () => {
  const query = 'INSERT INTO StoreManager.sales(date) VALUES(CURDATE())';
  const [result] = await connection.execute(query);
  return result.insertId;
};

const getAllSales = async () => {
  const query = ` SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s 
  ON s.id = sp.sale_id;
  ORDER BY sp.sale_id ASC, sp.product_id ASC`;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const query = `SELECT (s.date) AS date,
    (sp.product_id) AS productId,
      (sp.quantity) AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s ON s.id = sp.sale_id
  WHERE sp.sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  createSale,
  registerSale,
  getAllSales,
  getSaleById,
};