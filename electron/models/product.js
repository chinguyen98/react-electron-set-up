const sequelize = require('sequelize');
const db = require("../db");

const Product = db.define('products', {
  name: {
    type: sequelize.TEXT,
    field: 'name',
  },
  qty: {
    type: sequelize.NUMBER,
    field: 'qty',
  },
})

module.exports = Product;