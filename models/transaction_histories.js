'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_histories = sequelize.define('transaction_histories', {
    transaction_id: DataTypes.INTEGER,
    progress_status_id: DataTypes.INTEGER
  }, {});
  transaction_histories.associate = function(models) {
    // associations can be defined here
  };
  return transaction_histories;
};