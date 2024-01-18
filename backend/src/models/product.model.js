const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const insertNewProduct = async (name) => {
  const [{ id }] = await connection
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
  return { id, name };
};
  
module.exports = {
  findAll,
  findById,
  insertNewProduct,
};