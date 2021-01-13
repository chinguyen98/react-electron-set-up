const Product = require('./../models/product');

const getAllProducts = async () => {
  const products = await Product.findAll({
    raw: true,
  });
  return products;
}

module.exports = {
  getAllProducts,
}