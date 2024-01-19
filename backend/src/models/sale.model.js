const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`
  SELECT 
    sale_id "saleId", 
    date, 
    product_id, 
    quantity 
  FROM sales_products 
  INNER JOIN 
    sales ON id = sale_id
    `);
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(`
  SELECT 
    date,
    product_id,
    quantity
  FROM sales
  INNER JOIN
    sales_products ON id = sale_id
  WHERE id = ?
  `, [saleId]);
  return camelize(sale);
};

const insertNewSale = async (products) => {
  const [{ insertId: saleId }] = await connection.execute(`
  INSERT INTO sales (date) 
    VALUES (NOW())
  `);

  const arrayOfPromises = products.map(async (product) => {
    const { productId, quantity } = product; 
    await connection.execute(`
    INSERT INTO sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)
    `, [saleId, productId, quantity]);
  });

  await Promise.all(arrayOfPromises);

  return {
    id: saleId,
    itemsSold: products,
  };
};
  
module.exports = {
  findAll,
  findById,
  insertNewSale,
};