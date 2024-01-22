const Joi = require('joi');

const addNewProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addProductQuantitySchema = Joi.object({
  quantity: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

const salesProductSchema = Joi.object({
  productId: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.min': 'Product not found',
      'any.required': '"productId" is required',
    }),

  quantity: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
});

const addNewSaleSchema = Joi.array().items(salesProductSchema);

module.exports = {
  addNewProductSchema,
  addNewSaleSchema,
  addProductQuantitySchema,
};