'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_lists = sequelize.define('transaction_lists', {
    transaction_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    not_stock: DataTypes.BOOLEAN
  }, {});
  transaction_lists.associate = function(models) {
    // associations can be defined here
  };
  return transaction_lists;
};