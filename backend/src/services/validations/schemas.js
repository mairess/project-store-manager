const Joi = require('joi');

const addNewProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  addNewProductSchema,
};