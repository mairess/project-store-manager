const express = require('express');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const cors = require('cors');
const { productRoutes, saleRoutes } = require('./routes');

const raw = fs.readFileSync('swagger.yaml');
const data = yaml.load(raw);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(data));

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

module.exports = app;
