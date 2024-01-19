const productsFromDB = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do CapitÃ£o AmÃ©rica" },
];

const productsFromModel = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do CapitÃ£o AmÃ©rica" },
];

const productFromDB = { id: 2, name: 'Traje de encolhimento' };

const productFromModel = { id: 2, name: "Traje de encolhimento" };

const insertedProductFromModel = { id: 26, name: 'Produto do bom' };

const updatedProductFromModel = {
  id: 2,
  name: 'Capa do Batman',
}

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  insertedProductFromModel,
  updatedProductFromModel,
};
