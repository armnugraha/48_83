'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    company_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    total_response: DataTypes.INTEGER,
    id_client: DataTypes.INTEGER,
    id_seller: DataTypes.INTEGER,
    items: { 
        type: DataTypes.TEXT, 
        get: function() {
            return JSON.parse(this.getDataValue('items'));
        }, 
        set: function(val) {
            return this.setDataValue('items', JSON.stringify(val));
        }
    },
    cash: DataTypes.INTEGER,
    total_pay: DataTypes.INTEGER,
    total_back: DataTypes.INTEGER
  }, {});
  transactions.associate = function(models) {
    // associations can be defined here
  };
  return transactions;
};