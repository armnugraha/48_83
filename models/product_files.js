'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_files = sequelize.define('product_files', {
    product_id: DataTypes.INTEGER,
    data: DataTypes.TEXT
  }, {});
  product_files.associate = function(models) {
    // associations can be defined here
  };
  return product_files;
};