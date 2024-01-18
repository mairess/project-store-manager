const { addNewProductSchema } = require('./schemas');

const validateCreateNewProduct = (keysObjectToValidate) => {
  const { error } = addNewProductSchema.validate(keysObjectToValidate);

  if (error) {
    return { status: error.message.includes('characters')
      ? 'INVALID_VALUE' : 'BAD_REQUEST',
    message: error.message };
  }
  // if (error.message.includes('characters')) {
  //   return { status: 'INVALID_VALUE', message: error.message };
  // }
  console.log('error', error);
};

module.exports = {
  validateCreateNewProduct,
};
