// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  // todo: add here


})

// Categories have many Products
Category.hasMany(Product, {
// todo: add here


})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
// todo: add here


})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
// todo: add here


})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
