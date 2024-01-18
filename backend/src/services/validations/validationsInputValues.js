const { addNewProductSchema, addNewSaleSchema } = require('./schemas');

const validateCreateNewProduct = (keysObjectToValidate) => {
  const { error } = addNewProductSchema.validate(keysObjectToValidate);

  if (error) {
    return { status: error.message.includes('characters')
      ? 'INVALID_VALUE'
      : 'BAD_REQUEST',
    message: error.message };
  }
};

const validateCreateNewSale = (keysObjectToValidate) => {
  console.log('obejto para validação', keysObjectToValidate);
  const { error } = addNewSaleSchema.validate(keysObjectToValidate);

  if (error) {
    return { status: error.message.includes('required')
      ? 'BAD_REQUEST'
      : 'INVALID_VALUE',
    message: error.message };
  }
};

module.exports = {
  validateCreateNewProduct,
  validateCreateNewSale,
};
