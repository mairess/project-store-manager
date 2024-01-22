const express = require('express');
const { productRoutes, saleRoutes } = require('./routes');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

module.exports = app;
