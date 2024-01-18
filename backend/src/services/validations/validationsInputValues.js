const { addNewProductSchema } = require('./schemas');

const validateCreateNewProduct = (keysObjectToValidate) => {
  const { error } = addNewProductSchema.validate(keysObjectToValidate);

  if (error) {
    return { status: error.message.includes('characters')
      ? 'INVALID_VALUE'
      : 'BAD_REQUEST',
    message: error.message };
  }
};

module.exports = {
  validateCreateNewProduct,
};
