'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    company_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: { 
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('price'));
        }, 
        set: function(val) {
            return this.setDataValue('price', JSON.stringify(val));
        }
    },
    discount: DataTypes.INTEGER
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};