// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
    // todo: add id attributes

    },
    product_name: {
    // todo: add product_name attributes

    },
    price: {
    // todo: add price attributes

    },
    stock: {
    // todo: add stock attributes

    },
    category_id: {
    // todo: add category_id attributes

    } 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
