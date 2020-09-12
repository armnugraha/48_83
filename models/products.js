'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    company_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};