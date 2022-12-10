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
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
    // todo: add product_name attributes
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
    // todo: add price attributes
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        isDecimal: true
    }
    },
    stock: {
    // todo: add stock attributes
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true    
      }
    },
    category_id: {
    // todo: add category_id attributes
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
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
