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
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const newProduct = await findById(insertId);
  return newProduct;
};

// const insertNewProduct = async (name) => {
//   const [{ insertId }] = await connection
//     .execute('INSERT INTO products (name) VALUES (?)', [name]);
//   console.log(insertId);
//   return { id: insertId, name };
// };
  
module.exports = {
  findAll,
  findById,
  insertNewProduct,
};