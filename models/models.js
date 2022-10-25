const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define(
  'admin',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    password: { type: DataTypes.STRING },
  },
  { timestamps: false },
);

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categories: { type: DataTypes.INTEGER, allowNull: true },
  styleID: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const ProductDescription = sequelize.define('product_description', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.STRING, allowNull: false },
});

const Categories = sequelize.define('categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Style = sequelize.define('style', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.STRING, allowNull: false },
});

Product.hasMany(ProductDescription, {
  as: 'description',
  foreignKey: 'productId',
  sourceKey: 'id',
});
Categories.hasMany(Style, {
  as: 'styles',
  foreignKey: 'categoriesId',
  sourceKey: 'id',
});

ProductDescription.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' });
Style.belongsTo(Categories, { foreignKey: 'categoriesId', targetKey: 'id' });

// Products.hasOne(Categories);
// Categories.belongsTo(Products);

// Products.hasOne(Style);
// Style.belongsTo(Products);

module.exports = {
  Admin,
  Product,
  Categories,
  Style,
  ProductDescription,
};
